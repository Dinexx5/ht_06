import {Response, Router} from "express"

import {emailValidation, inputValidationMiddleware,
        loginValidation, objectIdIsValid, passwordValidation,
} from "../middlewares/input-validation";

import {RequestWithQuery, RequestWithParams, RequestWithBody} from "../repositories/types";

import {
    createUserInputModel,
    getAllUsersQueryModel,
    paramsIdModel,
    userModel,
    usersViewModel
} from "../models/models";

import {usersService} from "../domain/users-service";
import {usersQueryRepository} from "../repositories/users-query-repository";
import {basicAuthorisation} from "../middlewares/auth-middlewares";



export const usersRouter = Router({})


usersRouter.get('/',
    basicAuthorisation,
    async (req: RequestWithQuery<getAllUsersQueryModel>, res: Response) => {

    const returnedUsers: usersViewModel= await usersQueryRepository.getAllUsers(req.query)

    res.status(200).send(returnedUsers)


})

usersRouter.post('/',
    basicAuthorisation,
    loginValidation,
    emailValidation,
    passwordValidation,
    inputValidationMiddleware,
    async(req: RequestWithBody<createUserInputModel>, res: Response<userModel>) => {
    const newUser = await usersService.createUser(req.body)
    res.status(201).send(newUser)

})

usersRouter.delete('/:id',
    basicAuthorisation,
    objectIdIsValid,
    async (req: RequestWithParams<paramsIdModel>, res: Response) => {
    const isDeleted: boolean = await usersService.deleteUserById(req.params.id)
    if (isDeleted) {
        res.send(204)
        return
    }
    res.send(404)

})