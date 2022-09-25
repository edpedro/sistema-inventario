import {Request, Response} from 'express'
import { AuthUserService } from '../../services/user/AuthUserService'

class AuthUserController {
   async handle(req: Request, res: Response){
    const {username, password } = req.body

    const authUserService = new AuthUserService()

    const user = await authUserService.execute({ username, password})

    return res.json(user)
   }
}

export { AuthUserController }