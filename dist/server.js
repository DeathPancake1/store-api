"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
require('dotenv').config();
var app_1 = require("./app");
var address = '0.0.0.0:3000';
exports.server = app_1.app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
