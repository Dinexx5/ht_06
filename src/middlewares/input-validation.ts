import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";
import {blogType} from "../models/models";
import {ObjectId} from "mongodb";
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

const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            "message": error.msg,
            "field": error.param
        };
    },
});

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorsMessages: errors.array() });
    } else {
        next()
    }
}


export const objectIdIsValid = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        next()
    } else {
        return res.status(400).end()
    }
}

export const bearerAuthMiddleware = async (req:Request, res:Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.send(401)
        return
    }
    const token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
    if (userId) {
        req.user = await usersService.findUserById(userId)
        next ()
    }
    res.send(401)
}


//blogs validation
export const nameValidation = body('name').trim().isLength({max: 15}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string')
export const descriptionValidation = body('description').trim().isLength({max: 500}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string')
export const websiteUrlValidation = body('websiteUrl').trim().isURL().withMessage('Not a Url')

//posts validation

export const titleValidation = body('title').trim().isLength({max: 30}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string title')
export const shortDescriptionValidation = body('shortDescription').trim().isLength({max: 100}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string desc')
export const contentValidation = body('content').trim().isLength({max: 1000}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string content')
export const blogIdlValidation = body('blogId').trim().not().isEmpty().withMessage('Not a string blogId').isLength({max: 30}).withMessage('Incorrect length of blogId')
    .custom(async (value) => {
        const blog: blogType | null = await blogsQueryRepository.getBlogById(value)
        if (!blog) {
            throw new Error('blog id does not exist');
        }
        return true

    })

//users validation
export const loginValidation = body('login').trim().isLength({min: 3, max: 10}).withMessage('Incorrect length').matches(/^[a-zA-Z0-9_-]*$/).withMessage('Incorrect login pattern')
export const passwordValidation = body('password').trim().isLength({min: 6, max: 20}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string')
export const emailValidation = body('email').trim().isEmail().withMessage('Not an email')

//auth validation

export const loginOrEmailValidation = body('loginOrEmail').trim().not().isEmpty().withMessage('Not a string')
export const passwordAuthValidation = body('password').trim().not().isEmpty().withMessage('Not a string')

//comments validation
export const commentValidation = body('content').trim().isLength({min: 20, max: 300}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string')

