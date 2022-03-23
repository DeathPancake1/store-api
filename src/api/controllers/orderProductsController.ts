import { Router, Response, Request } from 'express';

import OrderProductsStore from '../models/order_products';
import { OrderProducts } from '../models/order_products';
import { authenticatorToken } from '../../authenticator';

export const OrderProductsController: Router = Router()
const order: OrderProductsStore = new OrderProductsStore()

OrderProductsController.get(
    '/',
    authenticatorToken ,
    async (req:Request, res: Response) => {
    const orderProducts: OrderProducts[] = await order.index();
    return res.json(orderProducts);
   }
)

OrderProductsController.get(
    '/order/:order_id',
    authenticatorToken ,
   async (req:Request, res: Response) => {
    const orderID: number = parseInt(req.params.order_id);
    const currentOrder: OrderProducts[] = await order.getOrderProdByOrderID(orderID);
    return res.json(currentOrder);
   }
)

OrderProductsController.get(
    '/:id',
    authenticatorToken ,
   async (req:Request, res: Response) => {
    const orderID: number = parseInt(req.params.id);
    const currentOrder: OrderProducts = await order.getOrderByID(orderID);
    return res.json(currentOrder);
   }
)

OrderProductsController.post('/', authenticatorToken,async (req:Request, res: Response) => {
    const createdOrder : OrderProducts = await order.createOrderProducts(req.body);
    return res.json(createdOrder)
})

OrderProductsController.delete('/:id', authenticatorToken, async (req : Request, res : Response) => {
    const orderID: number = parseInt(req.params.id)
    const deletedOrder: OrderProducts = await order.deleteOrderProducts(orderID)
    return res.json(deletedOrder)
})