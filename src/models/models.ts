
// export type getAllBlogsQueryModel = {
//     sortBy: string
//     sortDirection: string
//     pageNumber: string
//     pageSize: string
//     searchNameTerm: string
// }
export type createBlogInputModel = {
    name: string
    description: string
    websiteUrl:string
}
export type updateBlogInputModel = {
    name: string
    description: string
    websiteUrl:string
}
// export type getAllPostsQueryModel = {
//     sortBy: string
//     sortDirection: string
//     pageNumber: number
//     pageSize: number
// }
export type createPostInputModel = {
    title: string
    shortDescription: string
    content: string
}

export type createPostInputModelWithBlogId = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type updatePostInputModel = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

// export type QueryPosts = {
//     sortDirection: string
//     sortBy: string
//     pageNumber: string
//     pageSize: string
// }

export type blogViewModel = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
}

export type postViewModel = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type blogDbModel = {
    _id: Object
    name: string
    description: string
    websiteUrl: string
    createdAt: string
}

export type postDbModel = {
    _id: Object
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type paginatedBlogsViewModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: blogViewModel[]
}

export type paginatedPostsViewModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: postViewModel[]
}

export type paramsIdModel = {
    id: string
}

export type createUserInputModel = {
    login: string
    password: string
    email: string
}

// export type getAllUsersQueryModel = {
//     sortBy: string
//     sortDirection: string
//     pageNumber: string
//     pageSize: string
//     searchLoginTerm: string
//     searchEmailTerm: string
// }

export type userViewModel = {
    id: string
    login: string
    email: string
    createdAt: string
}

// export type queryUsers = {
//     sortDirection: string
//     sortBy: string
//     pageNumber: string
//     pageSize: string
//     searchLoginTerm: string | null
//     searchEmailTerm: string | null
// }

export type paginatedUsersViewModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: userViewModel[]
}
export type userDbType = {
    _id: Object
    login: string
    email: string
    passwordHash: string
    createdAt: string
}
export type authInputModel = {
    loginOrEmail: string
    password: string
}
export type createCommentInputModel = {
    content: string
}

export type commentViewModel = {
    id: string
    content: string
    userId: string
    userLogin: string
    createdAt: string
}
export type commentDbType = {
    _id: Object
    content: string
    createdAt: string
    userId: string
    userLogin: string
    postId: string
}

// export type getAllCommentsQueryModel = {
//     sortBy: string
//     sortDirection: string
//     pageNumber: string
//     pageSize: string
// }

export type commentType = {
    id: string
    content: string
    createdAt: string
    userId: string
    userLogin: string
}
export type paginatedCommentsViewModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: commentType []
}
export type paginationQuerys = {
    sortDirection: string
    sortBy: string
    pageNumber: string
    pageSize: string
    searchNameTerm?: string
    searchLoginTerm?: string
    searchEmailTerm?: string
}