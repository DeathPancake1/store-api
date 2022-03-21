"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../database");
var bcrypt_1 = __importDefault(require("bcrypt"));
var authenticator_1 = require("../../authenticator");
require('dotenv').config();
var UsersStore = /** @class */ (function () {
    function UsersStore() {
    }
    UsersStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.Client.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM users";
                        return [4 /*yield*/, conn];
                    case 2:
                        result = (_a.sent()).query(sql);
                        console.log(result);
                        return [4 /*yield*/, conn];
                    case 3:
                        (_a.sent()).release();
                        return [4 /*yield*/, result];
                    case 4: return [2 /*return*/, (_a.sent()).rows];
                    case 5:
                        e_1 = _a.sent();
                        throw new Error("Cannot get user ".concat(e_1));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UsersStore.prototype.getUser = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.Client.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM users WHERE id=$1";
                        return [4 /*yield*/, conn];
                    case 2:
                        result = (_a.sent()).query(sql, [userID]);
                        return [4 /*yield*/, conn];
                    case 3:
                        (_a.sent()).release();
                        return [4 /*yield*/, result];
                    case 4: return [2 /*return*/, (_a.sent()).rows[0]];
                    case 5:
                        e_2 = _a.sent();
                        throw new Error("Error getting user by id ".concat(e_2));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UsersStore.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var pepper, salt, firstname, lastname, password, hashedPass, sql, conn, result, id, token, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        pepper = process.env.BCRYPT_PASSWORD;
                        salt = process.env.SALT_ROUNDS;
                        firstname = user.firstname, lastname = user.lastname, password = user.password;
                        hashedPass = bcrypt_1.default.hashSync(password + pepper, parseInt(salt));
                        sql = "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
                        return [4 /*yield*/, database_1.Client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn];
                    case 2: return [4 /*yield*/, (_a.sent()).query(sql, [firstname, lastname, hashedPass])];
                    case 3:
                        result = _a.sent();
                        return [4 /*yield*/, conn];
                    case 4:
                        (_a.sent()).release();
                        id = result.rows[0].id;
                        token = (0, authenticator_1.generateToken)(id);
                        return [2 /*return*/, {
                                auth: true,
                                token: token
                            }];
                    case 5:
                        e_3 = _a.sent();
                        throw new Error("Error creating user ".concat(e_3));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UsersStore.prototype.deleteUser = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.Client.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "DELETE FROM users WHERE id=$1 RETURNING *";
                        return [4 /*yield*/, conn];
                    case 2:
                        result = (_a.sent()).query(sql, [userID]);
                        return [4 /*yield*/, conn];
                    case 3:
                        (_a.sent()).release();
                        return [4 /*yield*/, result];
                    case 4: return [2 /*return*/, (_a.sent()).rows[0]];
                    case 5:
                        e_4 = _a.sent();
                        throw new Error("Error deleting user by id ".concat(e_4));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UsersStore;
}());
exports.default = UsersStore;
