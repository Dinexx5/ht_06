import {createCommentModel, userDbType} from "../models/models";
import {commentsRepository} from "../repositories/comments/comments-repository";


export const commentsService = {
    async createComment (content: string, userId: Object) {
        return await commentsRepository.createComment(content, userId)
    }
}