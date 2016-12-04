"use strict";

const User = require('../models/user').User;

const config = require("../config.json");
const Router = require('koa-router');
const routes = new Router({prefix: '/users'});

module.exports.routes = function () {

    routes.get('/',this.getUsers);
    routes.post('/',this.createUser);

    return routes.middleware();
};

module.exports.getUsers = function* getUsers() {
    const users = yield User.find();
    this.body = users;
};

module.exports.createUser = function* createUser() {
    let user = new User(this.request.body.user);
    const result = yield user.save();
    this.body = result;
};



