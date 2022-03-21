"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
var generateToken = function (id) {
    return jsonwebtoken_1.default.sign(id.toString(), process.env.JWT_SECRET);
};
exports.generateToken = generateToken;
var authToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader ? authorizationHeader.split(' ')[1] : '';
        var decToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.locals.userData = decToken;
        next();
    }
    catch (err) {
        res.send('jwt error');
        console.log(err);
    }
};
exports.authToken = authToken;
