import {commentsCollection, usersCollection} from "../db";
import {commentDbType, commentViewModel, createCommentModel, userDbType, userModel} from "../../models/models";
import {ObjectId} from "mongodb";


export const commentsRepository = {
    async createComment (content: string, user: userDbType): Promise<commentViewModel> {

        const commentDb: commentDbType = {
            _id: new ObjectId(),
            content: content,
            createdAt: new Date().toISOString(),
            userId: user._id.toString(),
            userLogin: user.login
        }
        await commentsCollection.insertOne(commentDb)
        return {
            id: commentDb._id.toString(),
            content: commentDb.content,
            userId: commentDb.userId,
            userLogin: commentDb.userLogin,
            createdAt: commentDb.createdAt
        }
    }
}