"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = require("./api/routes");
exports.app = (0, express_1.default)();
var corsOption = {
    optionsSuccessStatus: 200
};
exports.app.use((0, cors_1.default)(corsOption));
exports.app.use(express_1.default.json());
(0, routes_1.routes)(exports.app);
