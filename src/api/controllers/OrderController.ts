import { Router, Response, Request } from 'express';

import OrdersStore from '../models/orders';
import { Order } from '../interfaces/order';
import { generateToken } from '../../authenticator'

export const OrderController: Router = Router()
const order: OrdersStore = new OrdersStore()

OrderController.get(
    '/:user_id',
    authToken
)