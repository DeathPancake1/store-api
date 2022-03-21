import {Router, Application } from 'express'
import { ProductController } from './controllers/productController'
import { UserController } from './controllers/userController'
import { OrderController} from './controllers/orderController'

const router: [string, Router][] = [
    ['/products', ProductController],
    ['/users', UserController],
    ['/orders', OrderController]
];

export const routes = (app: Application): void => {
    router.forEach((route) => {
      const [url, controller] = route;
      app.use(url, controller);
    });
  };