import { Router, Response, Request } from 'express';

import OrdersStore from '../models/orders';
import { Order } from '../models/orders';
import { authenticatorToken } from '../../authenticator';

export const OrderController: Router = Router()
const order: OrdersStore = new OrdersStore()

OrderController.get(
    '/',
    authenticatorToken ,
   async (req:Request, res: Response) => {
    try{
        const orders: Order[] = await order.index();
        return res.json(orders);
    }catch(e){
        console.log(e)
    }
   }
)

OrderController.get(
    '/:user_id',
    authenticatorToken ,
   async (req:Request, res: Response) => {
       try{
        const userId: number = parseInt(req.params.user_id);
        const currentOrder: Order = await order.getOrderByUserID(userId);
        return res.json(currentOrder);
       }catch(e){
           console.log(e)
       }
   }
)

OrderController.put(
    '/', 
    authenticatorToken, 
    async (req: Request, res: Response) => {
        try{
            const status = req.query.status as string;
            const orderId = parseInt(req.query.orderId as string);
        
            if (orderId && ['active', 'complete'].includes(status)) {
                const updatedOrder: Order = await order.updateOrder(
                    orderId,
                    status
                );
                return res.json(updatedOrder);
            } else {
                return res.status(400).json({ Error: 'Bad parameters' });
            }
        }
        catch(e){
            console.log(e)
        }
  });

OrderController.post('/', authenticatorToken,async (req:Request, res: Response) => {
    try{
        const createdOrder : Order = await order.createOrder(req.body);
        return res.json(createdOrder)
    }
    catch(e){
        console.log(e)
    }
})

OrderController.delete('/:id', authenticatorToken, async (req : Request, res : Response) => {
    try{
        const orderID: number = parseInt(req.params.id)
        const deletedOrder: Order = await order.deleteOrder(orderID)
        return res.json(deletedOrder)
    }
    catch(e){
        console.log(e)
    }
})