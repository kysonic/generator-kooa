const path = require('path');

const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },
    initializing: function(){
        this.argument('name',{type:String,required:true});
        this.answers = {};
        this.answers.name = this.name[0].toUpperCase()+this.name.substr(1,this.name.length);
    },
    configuring: function(){
        this.destinationRoot(path.resolve('app/models'));
    },
    writing: {
        files: function(){
            const copy = (tplPath,destPath)=>this.fs.copyTpl(path.resolve(this.templatePath(),tplPath),
                                                             path.resolve(this.destinationRoot(),destPath),
                                                             this.answers);
            copy('model.js',`${this.answers.name.toLowerCase()}.js`);
        }
    }
});