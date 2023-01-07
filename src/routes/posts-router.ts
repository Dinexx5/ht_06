import {Request, Response, Router} from "express"

import {
    basicAuthorisation, bearerAuthMiddleware, blogIdlValidation, commentValidation, contentValidation,
    inputValidationMiddleware, objectIdIsValid,
    shortDescriptionValidation, titleValidation
} from "../middlewares/input-validation";

import {postsService} from "../domain/posts-service";

import {
    RequestWithBody, RequestWithParams,
    RequestWithParamsAndBody, RequestWithParamsAndQuery, RequestWithQuery
} from "../repositories/types";

import {postsQueryRepository} from "../repositories/posts-query-repository";

import {
    blogType, commentsViewModel, commentViewModel,
    createCommentModel,
    createPostInputModel, getAllCommentsQueryModel, getAllPostsQueryModel, paramsIdModel,
    postsViewModel, postType, updatePostInputModel
} from "../models/models";
import {commentsService} from "../domain/comments-service";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";
import {commentsQueryRepository} from "../repositories/comments/comments-query-repository";


export const postsRouter = Router({})



postsRouter.get('/', async (req: RequestWithQuery<getAllPostsQueryModel>, res: Response<postsViewModel>) => {

    const returnedPosts: postsViewModel = await postsQueryRepository.getAllPosts(req.query)
    res.status(200).send(returnedPosts)
})

postsRouter.get('/:id',
    objectIdIsValid,
    async (req: RequestWithParams<paramsIdModel>, res: Response) => {
    let post: postType | null = await postsQueryRepository.getPostById(req.params.id)
    if (!post) {
        res.send(404)
    } else {
        res.send(post)
    }
})

postsRouter.post('/',
    basicAuthorisation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdlValidation,
    inputValidationMiddleware,
    async (req: RequestWithBody<createPostInputModel>, res: Response<postType>) => {

        const newPost: postType = await postsService.createPost(req.body)
        res.status(201).send(newPost)


    })

postsRouter.delete('/:id',
    basicAuthorisation,
    objectIdIsValid,
    async (req: RequestWithParams<paramsIdModel>, res: Response) => {
    const isDeleted: boolean = await postsService.deletePostById(req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

postsRouter.put('/:id',
    basicAuthorisation,
    objectIdIsValid,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdlValidation,
    inputValidationMiddleware,
    async (req: RequestWithParamsAndBody<paramsIdModel, updatePostInputModel>, res: Response) => {

        let isUpdated: boolean = await postsService.UpdatePostById(req.params.id, req.body)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })

postsRouter.post('/:id/comments',
    bearerAuthMiddleware,
    commentValidation,
    async (req:RequestWithParamsAndBody<paramsIdModel, createCommentModel>, res:Response) => {
        const post: postType | null = await postsQueryRepository.getPostById(req.params.id)
        if (!post) {
            res.send(404)
            return
        }
        const newComment: commentViewModel | null = await commentsService.createComment(req.body.content, req.user!._id)
        res.status(201).send(newComment)
    })

postsRouter.get('/:id/comments',
    bearerAuthMiddleware,
    commentValidation,
    async (req: RequestWithParamsAndQuery<paramsIdModel, getAllCommentsQueryModel>, res: Response) => {
        const post: postType | null = await postsQueryRepository.getPostById(req.params.id)
        if (!post) {
            res.send(404)
            return
        }
        const returnedComments: commentsViewModel = await commentsQueryRepository.getAllComments(req.query)
        res.status(201).send(returnedComments)
    })
