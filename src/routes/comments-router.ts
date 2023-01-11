import {Response, Router} from "express"
import {commentsService} from "../domain/comments-service";
import {commentsQueryRepository} from "../repositories/comments/comments-query-repository";
import {
    RequestWithParams,
    RequestWithParamsAndBody,
} from "../repositories/types";
import {
    commentViewModel, createCommentInputModel,
    paramsIdModel,
} from "../models/models";

import {
    commentContentValidation,
    inputValidationMiddleware,
    objectIdIsValidMiddleware
} from "../middlewares/input-validation";
import {bearerAuthMiddleware} from "../middlewares/auth-middlewares";



export const commentsRouter = Router({})

commentsRouter.get('/:id',
    objectIdIsValidMiddleware,
    async (req: RequestWithParams<paramsIdModel>, res: Response) => {

    const returnedComment: commentViewModel | null = await commentsQueryRepository.getCommentById(req.params.id)
    if (!returnedComment) {
        res.send(404)
        return
    }
    res.status(200).send(returnedComment)
})

commentsRouter.put('/:id',
    bearerAuthMiddleware,
    objectIdIsValidMiddleware,
    commentContentValidation,
    inputValidationMiddleware,
    async (req: RequestWithParamsAndBody<paramsIdModel, createCommentInputModel>, res: Response) => {

        const comment: commentViewModel | null = await commentsQueryRepository.getCommentById(req.params.id)

        if (!comment) {
            res.send(404)
            return
        }
        if (comment.userId !== req.user!._id.toString()) {
            res.send(403)
            return
        }

        const isUpdated = await commentsService.updateCommentById(req.params.id, req.body.content)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })

commentsRouter.delete('/:id',
    bearerAuthMiddleware,
    objectIdIsValidMiddleware,
    async (req: RequestWithParams<paramsIdModel>, res: Response) => {

        const comment: commentViewModel | null = await commentsQueryRepository.getCommentById(req.params.id)

        if (!comment) {
            res.send(404)
            return
        }
        if (comment.userId !== req.user!._id.toString()) {
            res.send(403)
            return
        }

        const isDeleted: boolean = await commentsService.deleteCommentById(req.params.id)
        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

