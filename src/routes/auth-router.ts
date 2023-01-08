import {Request, Response, Router} from "express"
import {usersService} from "../domain/users-service";
import {RequestWithBody} from "../repositories/types";
import {authInputModel} from "../models/models";
import {
    bearerAuthMiddleware,
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
        if (!user) {
            res.send(401)
            return
        }
        const token = await jwtService.createJWT(user)
        res.status(201).send({"accessToken": token})
        return

    })

authRouter.get('/me',
    bearerAuthMiddleware,
    async(req: Request, res: Response) => {
    const user = req.user!;
    res.status(200).send({
            "email": user.email,
            "login": user.login,
            "userId": user._id.toString()
        })
    })
