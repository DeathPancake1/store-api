import { Router, Response, Request } from 'express';
import UsersStore from '../models/users';
import { User, UserAuth } from '../models/users';
import { authenticatorToken } from '../../authenticator';

export const UserController: Router = Router()
const user: UsersStore = new UsersStore()

UserController.get('/',authenticatorToken, async (req : Request, res : Response) => {
    const users: User[] = await user.index()
    return res.json(users)
})

UserController.get('/:id',authenticatorToken, async (req : Request, res : Response) => {
    const userID = parseInt(req.params.id)
    const retUser: User = await user.getUser(userID)
    return res.json(retUser)
})

UserController.post('/', async (req : Request, res : Response) => {
    const createdUser: UserAuth = await user.createUser(req.body)
    return res.json(createdUser)
})

UserController.delete('/:id', authenticatorToken, async (req : Request, res : Response) => {
    const userID: number = parseInt(req.params.id)
    const deletedUser: User = await user.deleteUser(userID)
    return res.json(deletedUser)
})