"use strict";

const Router = require('koa-router');
const routes = new Router();

module.exports.routes = function () {
    routes.get('/', this.index);

    return routes.middleware();
};

module.exports.index = function* () {

};


