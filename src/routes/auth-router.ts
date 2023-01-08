import {Response, Router} from "express"
import {usersService} from "../domain/users-service";
import {RequestWithBody} from "../repositories/types";
import {authInputModel} from "../models/models";
import {
    inputValidationMiddleware,
    loginOrEmailValidation,
    passwordAuthValidation,
} from "../middlewares/input-validation";
import {jwtService} from "../application/jwt-service";


export const authRouter = Router({})



authRouter.post('/login',
    loginOrEmailValidation,
    passwordAuthValidation,
    inputValidationMiddleware,
    async(req: RequestWithBody<authInputModel>, res: Response) => {
        const user = await usersService.checkCredentials(req.body)
        if (user) {
            const token = await jwtService.createJWT(user)
            res.status(201).send(token)
            return
        }
        res.send(401)

    })
