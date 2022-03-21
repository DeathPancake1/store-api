"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var productController_1 = require("./controllers/productController");
var userController_1 = require("./controllers/userController");
var orderController_1 = require("./controllers/orderController");
var router = [
    ['/products', productController_1.ProductController],
    ['/users', userController_1.UserController],
    ['/orders', orderController_1.OrderController]
];
var routes = function (app) {
    router.forEach(function (route) {
        var url = route[0], controller = route[1];
        app.use(url, controller);
    });
};
exports.routes = routes;
