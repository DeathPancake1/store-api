import { Client } from "../database"
import bcrypt from "bcrypt"
import { generateToken } from "../../authenticator";
require('dotenv').config()


export interface User {
    id?: number;
    firstname: string;
    lastname: string;
    password: string;
  }
export interface UserAuth {
    auth : boolean;
    token : string;
}

export default class UsersStore{
    async index() : Promise<User[]> {
        try{
            const conn = await Client.connect()
            const sql = "SELECT * FROM users"
            const result =  (await conn).query(sql);
            console.log(result);
            (await conn).release()
            return (await result).rows
        }
        catch(e){
            throw new Error(`Cannot get user ${e}`)
            
        }
    }

    async getUser(userID: number) : Promise<User> {
        try{
            const conn = await Client.connect()
            const sql = `SELECT * FROM users WHERE id=$1`
            const result =  (await conn).query(sql, [userID]);
            (await conn).release()
            return (await result).rows[0]
        } catch(e){
            throw new Error(`Error getting user by id ${e}`)
        }
    }

    async createUser(user:User): Promise<UserAuth>{
        try{
            const pepper: string = process.env.BCRYPT_PASSWORD as string;
            const salt: string = process.env.SALT_ROUNDS as string;
            const { firstname, lastname, password } = user
            const hashedPass : string = bcrypt.hashSync(password+ pepper, parseInt(salt));
            const sql: string = `INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *`
            const conn = await Client.connect()
            const result = await (await conn).query(sql, [firstname, lastname, hashedPass]);
            (await conn).release();
            const id: number = result.rows[0].id;
            const token: string = generateToken(id);
            return {
                auth: true,
                token
            };
        } catch(e){
            throw new Error(`Error creating user ${e}`)
        }
    }

    async deleteUser(userID: number) : Promise<User> {
        try{
            const conn = await Client.connect()
            const sql = `DELETE FROM users WHERE id=$1 RETURNING *`
            const result =  (await conn).query(sql, [userID]);
            (await conn).release()
            return (await result).rows[0]
        } catch(e){
            throw new Error(`Error deleting user by id ${e}`)
        }
    }
}