import { Client } from "../database"
import { OrderProducts } from "../interfaces/order_products";


export default class OrderProductsStore{
    async index() : Promise<OrderProducts[]> {
        try{
            const conn = await Client.connect()
            const sql = "SELECT * FROM order_products"
            const result =  (await conn).query(sql);
            console.log(result);
            (await conn).release()
            return (await result).rows
        }
        catch(e){
            throw new Error(`Cannot get orders ${e}`)
            
        }
    }

    async getOrderByID(orderID: number) : Promise<OrderProducts> {
        try{
            const conn = await Client.connect()
            const sql = `SELECT * FROM order_products WHERE id=$1`
            const result =  (await conn).query(sql, [orderID]);
            (await conn).release()
            return (await result).rows[0]
        } catch(e){
            throw new Error(`Error getting order by user id ${e}`)
        }
    }

    async getOrderProdByOrderID(orderProdID: number) : Promise<OrderProducts[]> {
        try{
            const conn = await Client.connect()
            const sql = `SELECT * FROM order_products WHERE order_id=$1 ORDER BY id DESC`
            const result =  (await conn).query(sql, [orderProdID]);
            (await conn).release()
            return (await result).rows
        } catch(e){
            throw new Error(`Error getting order by user id ${e}`)
        }
    }

    async createOrderProducts(orderProd:OrderProducts): Promise<OrderProducts>{
        try{
            const { order_id, quantity,product_id } = orderProd
            const sql: string = `INSERT INTO order_products (user_id, status) VALUES($1, $2, $3) RETURNING *`
            const conn = await Client.connect()
            const result = await (await conn).query(sql, [ order_id, quantity,product_id]);
            (await conn).release();
            return result.rows[0];
        } catch(e){
            throw new Error(`Error creating order ${e}`)
        }
    }

    async deleteOrderProducts(orderID: number) : Promise<OrderProducts> {
        try{
            const conn = await Client.connect()
            const sql = `DELETE FROM order_products WHERE id=$1 RETURNING *`
            const result =  (await conn).query(sql, [orderID]);
            (await conn).release()
            return (await result).rows[0]
        } catch(e){
            throw new Error(`Error deleting order by id ${e}`)
        }
    }
}