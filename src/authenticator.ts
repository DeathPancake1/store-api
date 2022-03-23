import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'
require('dotenv').config()

export const generateToken: Function = (id: number): string => {
  return jsonwebtoken.sign(id.toString(), process.env.JWT_SECRET as string);
};

export const authenticatorToken = (req: Request, res: Response, next: NextFunction) => {
    try{
        const authorizationHeader = req.headers.authorization
        const token :  string = authorizationHeader ? authorizationHeader.split(' ')[1] : '';
        const decToken :string | object = jsonwebtoken.verify(token, process.env.JWT_SECRET as string)
        res.locals.userData = decToken
        next()
    } catch(err) {
        res.send('jwt error')
        console.log(err)
    }
}