"use strict";

const config = require("../config.json");
const Router = require('koa-router');
const routes = new Router();

module.exports.routes = function () {
    routes.get('/', this.index);

    return routes.middleware();
};

module.exports.index = function* () {
    var n = this.session.views || 0;
    this.session.views = ++n;
    yield this.render("index", {title: config.sitename+'-'+this.session.views});
};


