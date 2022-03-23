import { Client } from "../database"


export interface Product {
    id?: number;
    name: string;
    price: string;
  }

export default class ProductsStore{
    async index() : Promise<Product[]> {
        try{
            const conn = await Client.connect()
            const sql = "SELECT * FROM products"
            const result =  (await conn).query(sql);
            console.log(result);
            (await conn).release()
            return (await result).rows
        }
        catch(e){
            throw new Error(`Cannot get products ${e}`)
            
        }
    }

    async getProduct(productID: number) : Promise<Product> {
        try{
            const conn = await Client.connect()
            const sql = `SELECT * FROM products WHERE id=$1`
            const result =  (await conn).query(sql, [productID]);
            (await conn).release()
            return (await result).rows[0]
        } catch(e){
            throw new Error(`Error getting product by id ${e}`)
        }
    }

    async createProduct(product:Product): Promise<Product>{
        try{
            const { name, price } = product
            console.log(product)
            const sql: string = `INSERT INTO products (name, price) VALUES($1, $2) RETURNING *`
            const conn = await Client.connect()
            const result = await (await conn).query(sql, [name, price]);
            (await conn).release();

            return result.rows[0]
        } catch(e){
            throw new Error(`Error creating product ${e}`)
        }
    }

    async deleteProduct(productID: number) : Promise<Product> {
        try{
            const conn = await Client.connect()
            const sql = `DELETE FROM products WHERE id=$1 RETURNING *`
            const result =  (await conn).query(sql, [productID]);
            (await conn).release()
            return (await result).rows[0]
        } catch(e){
            throw new Error(`Error deleting product by id ${e}`)
        }
    }
}