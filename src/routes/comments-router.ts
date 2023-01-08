import {Response, Router} from "express"
import {commentsService} from "../domain/comments-service";
import {commentsQueryRepository} from "../repositories/comments/comments-query-repository";
import {
    RequestWithBody, RequestWithParams,
    RequestWithParamsAndBody, RequestWithParamsAndQuery, RequestWithQuery
} from "../repositories/types";
import {
    commentsViewModel,
    commentViewModel, createCommentModel,
    getAllPostsQueryModel,
    paramsIdModel,
    postsViewModel
} from "../models/models";
import {postsQueryRepository} from "../repositories/posts-query-repository";
import {postsRouter} from "./posts-router";
import {
    bearerAuthMiddleware,
    commentValidation,
    inputValidationMiddleware,
    objectIdIsValid
} from "../middlewares/input-validation";
import {postsService} from "../domain/posts-service";


export const commentsRouter = Router({})

commentsRouter.get('/:id',
    objectIdIsValid,
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
    objectIdIsValid,
    commentValidation,
    inputValidationMiddleware,
    async (req: RequestWithParamsAndBody<paramsIdModel, createCommentModel>, res: Response) => {

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
    objectIdIsValid,
    async (req: RequestWithParams<paramsIdModel>, res: Response) => {

        const isDeleted: boolean = await commentsService.deleteCommentById(req.params.id)
        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

