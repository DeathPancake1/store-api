import { Client } from "../database"
import { Order } from "../interfaces/order";


export default class OrderStore{
    async index() : Promise<Order[]> {
        try{
            const conn = await Client.connect()
            const sql = "SELECT * FROM orders"
            const result =  (await conn).query(sql);
            console.log(result);
            (await conn).release()
            return (await result).rows
        }
        catch(e){
            throw new Error(`Cannot get orders ${e}`)
            
        }
    }

    async getOrderByUserID(userID: number) : Promise<Order> {
        try{
            const conn = await Client.connect()
            const sql = `SELECT * FROM orders WHERE user_id=$1 ORDER BY id DESC LIMIT 1`
            const result =  (await conn).query(sql, [userID]);
            (await conn).release()
            return (await result).rows[0]
        } catch(e){
            throw new Error(`Error getting order by user id ${e}`)
        }
    }

    async createOrder(order:Order): Promise<Order>{
        try{
            const { product_id, quantity, user_id, status } = order
            const sql: string = `INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *`
            const conn = await Client.connect()
            const result = await (await conn).query(sql, [product_id, quantity, user_id, status]);
            (await conn).release();
            return result.rows[0];
        } catch(e){
            throw new Error(`Error creating order ${e}`)
        }
    }

    async updateOrder(orderID : Number, status : String): Promise<Order>{
        try{
            const sql: string = `UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`
            const conn = await Client.connect()
            const result = await (await conn).query(sql, [orderID, status]);
            (await conn).release();
            return result.rows[0];
        } catch(e){
            throw new Error(`Error updating order ${e}`)
        }
    }

    async deleteOrder(orderID: number) : Promise<Order> {
        try{
            const conn = await Client.connect()
            const sql = `DELETE FROM orders WHERE id=$1 RETURNING *`
            const result =  (await conn).query(sql, [orderID]);
            (await conn).release()
            return (await result).rows[0]
        } catch(e){
            throw new Error(`Error deleting order by id ${e}`)
        }
    }
}