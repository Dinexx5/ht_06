import {
    commentDbType, commentsViewModel,
    commentType,
    getAllCommentsQueryModel,
} from "../../models/models";
import {commentsCollection} from "../db";

function commentsMapperToCommentType (comment: commentDbType): commentType {
    return  {
        userId: comment.userId,
        userLogin: comment.userLogin,
        content: comment.content,
        createdAt: comment.createdAt,
        id: comment._id.toString()
    }

}

export const commentsQueryRepository = {

    async getAllComments (query: getAllCommentsQueryModel): Promise<commentsViewModel> {

        const {sortDirection = "desc", sortBy = "createdAt", pageNumber = 1, pageSize = 10} = query
        const sortDirectionNumber: 1 | -1 = sortDirection === "desc" ? -1 : 1;
        const skippedCommentsNumber = (+pageNumber-1)*+pageSize

        const countAll = await commentsCollection.countDocuments()
        let commentsDb = await commentsCollection
            .find( { } )
            .sort( {[sortBy]: sortDirectionNumber} )
            .skip(skippedCommentsNumber)
            .limit(+pageSize)
            .toArray()

        const commentsView = commentsDb.map(commentsMapperToCommentType)
        return {
            pagesCount: Math.ceil(countAll/+pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countAll,
            items: commentsView
        }


    }
}
