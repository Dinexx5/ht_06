"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const input_validation_1 = require("../middlewares/input-validation");
const posts_service_1 = require("../domain/posts-service");
const posts_query_repository_1 = require("../repositories/posts-query-repository");
const comments_service_1 = require("../domain/comments-service");
const comments_query_repository_1 = require("../repositories/comments/comments-query-repository");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const returnedPosts = yield posts_query_repository_1.postsQueryRepository.getAllPosts(req.query);
    res.status(200).send(returnedPosts);
}));
exports.postsRouter.get('/:id', input_validation_1.objectIdIsValid, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let post = yield posts_query_repository_1.postsQueryRepository.getPostById(req.params.id);
    if (!post) {
        res.send(404);
    }
    else {
        res.send(post);
    }
}));
exports.postsRouter.post('/', input_validation_1.basicAuthorisation, input_validation_1.titleValidation, input_validation_1.shortDescriptionValidation, input_validation_1.contentValidation, input_validation_1.blogIdlValidation, input_validation_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = yield posts_service_1.postsService.createPost(req.body);
    res.status(201).send(newPost);
}));
exports.postsRouter.delete('/:id', input_validation_1.basicAuthorisation, input_validation_1.objectIdIsValid, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield posts_service_1.postsService.deletePostById(req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.postsRouter.put('/:id', input_validation_1.basicAuthorisation, input_validation_1.objectIdIsValid, input_validation_1.titleValidation, input_validation_1.shortDescriptionValidation, input_validation_1.contentValidation, input_validation_1.blogIdlValidation, input_validation_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isUpdated = yield posts_service_1.postsService.UpdatePostById(req.params.id, req.body);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.postsRouter.post('/:id/comments', input_validation_1.bearerAuthMiddleware, input_validation_1.commentValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_query_repository_1.postsQueryRepository.getPostById(req.params.id);
    if (!post) {
        res.send(404);
        return;
    }
    const newComment = yield comments_service_1.commentsService.createComment(req.body.content, req.user._id);
    res.status(201).send(newComment);
}));
exports.postsRouter.get('/:id/comments', input_validation_1.bearerAuthMiddleware, input_validation_1.commentValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_query_repository_1.postsQueryRepository.getPostById(req.params.id);
    if (!post) {
        res.send(404);
        return;
    }
    const returnedComments = yield comments_query_repository_1.commentsQueryRepository.getAllComments(req.query);
    res.status(201).send(returnedComments);
}));
