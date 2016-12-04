var mongoose = require('../libs/mongoose');
const crypto = require('crypto');

var UserSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    hashedPassword: String,
    birthDate: {type: Date, default: Date.now}
});

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

// Hooks
UserSchema.pre('save', function (next) {
    if (!this.isNew) return next();

    if (!this.password) {
        let error = new Error('Invalid password');
        error.code = 901;
        next(error);
    } else {
        next();
    }
});

UserSchema.methods = {
    /**
     * Compare passwords to auth user
     * @param unhashedPassword
     * @returns {boolean}
     */
    compare: function (unhashedPassword) {
        return this.encryptPassword(unhashedPassword) === this.hashedPassword;
    },
    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    /**
     * Encrypt password
     * @param password - unhashed password
     * @returns {*}
     */
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
};

var User = mongoose.model('User', UserSchema);

// Validators
User.schema.path('name').validate(function (name) {
    return name.trim().length;
}, 'Name cannot be blank');

exports.User = User;

