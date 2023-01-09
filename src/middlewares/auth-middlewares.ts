import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../domain/users-service";

export const basicAuthorisation = (req: Request, res: Response, next: NextFunction) => {
    const loginPass = req.headers.authorization;
    if (loginPass === "Basic YWRtaW46cXdlcnR5") {
        next()
    } else {
        return res.status(401).send("access forbidden")
    }
}

export const bearerAuthMiddleware = async (req:Request, res:Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).send()
    }
    const token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
    if (userId) {
        req.user = await usersService.findUserById(userId)
        next ()
        return
    }
    return res.status(401).send()
}