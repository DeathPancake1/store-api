import { Router, Response, Request } from 'express';
import UsersStore from '../models/users';
import { User, UserAuth } from '../interfaces/user';
import { authToken } from '../../authenticator';

export const UserController: Router = Router()
const user: UsersStore = new UsersStore()

UserController.get('/',authToken, async (req : Request, res : Response) => {
    const users: User[] = await user.index()
    return res.json(users)
})

UserController.get('/:id',authToken, async (req : Request, res : Response) => {
    const userID = parseInt(req.params.id)
    const retUser: User = await user.getUser(userID)
    return res.json(retUser)
})

UserController.post('/', authToken, async (req : Request, res : Response) => {
    const createdUser: UserAuth = await user.createUser(req.body)
    return res.json(createdUser)
})

UserController.delete('/:id', authToken, async (req : Request, res : Response) => {
    const userID: number = parseInt(req.params.id)
    const deletedUser: User = await user.deleteUser(userID)
    return res.json(deletedUser)
})