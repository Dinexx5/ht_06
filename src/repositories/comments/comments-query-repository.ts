import {
    commentDbType, commentsViewModel,
    commentType, commentViewModel,
    getAllCommentsQueryModel, postDbType, postType,
} from "../../models/models";
import {commentsCollection, postsCollection} from "../db";
import {ObjectId} from "mongodb";

function commentsMapperToCommentType (comment: commentDbType): commentType {
    return  {
        id: comment._id.toString(),
        content: comment.content,
        userId: comment.userId,
        userLogin: comment.userLogin,
        createdAt: comment.createdAt,
    }

}

export const commentsQueryRepository = {

    async getAllCommentsForPost(query: getAllCommentsQueryModel, postId: string): Promise<commentsViewModel> {

        const {sortDirection = "desc", sortBy = "createdAt", pageNumber = 1, pageSize = 10} = query
        const sortDirectionNumber: 1 | -1 = sortDirection === "desc" ? -1 : 1;
        const skippedCommentsNumber = (+pageNumber - 1) * +pageSize

        const countAll = await commentsCollection.countDocuments({postId: postId})
        let commentsDb = await commentsCollection
            .find({postId: postId})
            .sort({[sortBy]: sortDirectionNumber})
            .skip(skippedCommentsNumber)
            .limit(+pageSize)
            .toArray()

        const commentsView = commentsDb.map(commentsMapperToCommentType)
        return {
            pagesCount: Math.ceil(countAll / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countAll,
            items: commentsView
        }


    },
    async getCommentById(id: string): Promise<commentViewModel | null> {

        let _id = new ObjectId(id)
        let comment: commentDbType | null = await commentsCollection.findOne({_id: _id})
        if (!comment) {
            return null
        }
        return commentsMapperToCommentType(comment)
    }
}

