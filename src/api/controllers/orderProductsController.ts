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
    try{
        const orderProducts: OrderProducts[] = await order.index();
        return res.json(orderProducts);
    }catch(e){
        console.log(e)
    }
   }
)

OrderProductsController.get(
    '/order/:order_id',
    authenticatorToken ,
   async (req:Request, res: Response) => {
    try{
        const orderID: number = parseInt(req.params.order_id);
        const currentOrder: OrderProducts[] = await order.getOrderProdByOrderID(orderID);
        return res.json(currentOrder);
    }
    catch(e){
        console.log(e)
    }
   }
)

OrderProductsController.get(
    '/:id',
    authenticatorToken ,
   async (req:Request, res: Response) => {
    try{
        const orderID: number = parseInt(req.params.id);
        const currentOrder: OrderProducts = await order.getOrderByID(orderID);
        return res.json(currentOrder);
    }
    catch(e){
        console.log(e)
    }
   }
)

OrderProductsController.post('/', authenticatorToken,async (req:Request, res: Response) => {
    try{
        const createdOrder : OrderProducts = await order.createOrderProducts(req.body);
        return res.json(createdOrder)
    }catch(e){
        console.log(e)
    }
})

OrderProductsController.delete('/:id', authenticatorToken, async (req : Request, res : Response) => {
    try{
        const orderID: number = parseInt(req.params.id)
        const deletedOrder: OrderProducts = await order.deleteOrderProducts(orderID)
        return res.json(deletedOrder)
    }
    catch(e){
        console.log(e)
    }
})