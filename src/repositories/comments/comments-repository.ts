import {commentsCollection, usersCollection} from "../db";
import {commentDbType, commentViewModel, createCommentModel, userDbType, userModel} from "../../models/models";
import {ObjectId} from "mongodb";


export const commentsRepository = {
    async createComment (content: string, userId: Object): Promise<commentViewModel | null> {

        const userDb:userDbType | null = await usersCollection.findOne({_id: userId })
        if (!userDb) {
            return null
        }
        const commentDb: commentDbType = {
            _id: new ObjectId(),
            content: content,
            createdAt: new Date().toISOString(),
            userId: userDb._id.toString(),
            userLogin: userDb.login
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