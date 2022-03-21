import { Router, Response, Request } from 'express';

import OrdersStore from '../models/orders';
import { Order } from '../interfaces/order';
import { authToken } from '../../authenticator';

export const OrderController: Router = Router()
const order: OrdersStore = new OrdersStore()

OrderController.get(
    '/',
    authToken ,
   async (req:Request, res: Response) => {
    const orders: Order[] = await order.index();
    return res.json(orders);
   }
)

OrderController.get(
    '/:user_id',
    authToken ,
   async (req:Request, res: Response) => {
    const userId: number = parseInt(req.params.user_id);
    const currentOrder: Order = await order.getOrderByUserID(userId);
    return res.json(currentOrder);
   }
)

OrderController.put(
    '/', 
    authToken, 
    async (req: Request, res: Response) => {
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
  });

OrderController.post('/', authToken,async (req:Request, res: Response) => {
    const createdOrder : Order = await order.createOrder(req.body);
    return res.json(createdOrder)
})

OrderController.delete('/:id', authToken, async (req : Request, res : Response) => {
    const orderID: number = parseInt(req.params.id)
    const deletedOrder: Order = await order.deleteOrder(orderID)
    return res.json(deletedOrder)
})