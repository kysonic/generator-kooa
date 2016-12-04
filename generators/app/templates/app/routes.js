"use strict";

const app = require("../app");
const main = require("./controllers/main");
const user = require("./controllers/user");

app.use(main.routes());
app.use(user.routes());
