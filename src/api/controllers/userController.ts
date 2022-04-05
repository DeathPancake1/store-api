import { Router, Response, Request } from 'express';
import UsersStore from '../models/users';
import { User, UserAuth } from '../models/users';
import { authenticatorToken } from '../../authenticator';

export const UserController: Router = Router()
const user: UsersStore = new UsersStore()

UserController.get('/',authenticatorToken, async (req : Request, res : Response) => {
    try{
        const users: User[] = await user.index()
        return res.json(users)
    }catch(e){
        console.log(e)
    }
})

UserController.get('/:id',authenticatorToken, async (req : Request, res : Response) => {
    try{
        const userID = parseInt(req.params.id)
        const retUser: User = await user.getUser(userID)
        return res.json(retUser)
    }catch(e){
        console.log(e)
    }
})

UserController.post('/', async (req : Request, res : Response) => {
    try{
        const createdUser: UserAuth = await user.createUser(req.body)
        return res.json(createdUser)
    }catch(e){
        console.log(e)
    }
})

UserController.delete('/:id', authenticatorToken, async (req : Request, res : Response) => {
    try{
        const userID: number = parseInt(req.params.id)
        const deletedUser: User = await user.deleteUser(userID)
        return res.json(deletedUser)
    }catch(e){
        console.log(e)
    }
})