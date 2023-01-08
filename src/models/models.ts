export type getPostsForSpecifiedBlogModel = {
    sortBy: string
    sortDirection: string
    pageNumber: number
    pageSize: number
}
export type getAllBlogsQueryModel = {
    sortBy: string
    sortDirection: string
    pageNumber: string
    pageSize: string
    searchNameTerm: string
}
export type createPostForSpecifiedBlogInputModel = {
    title: string
    shortDescription: string
    content: string
}
export type createBlogModel = {
    name: string
    description: string
    websiteUrl:string
}
export type updateBlogModel = {
    name: string
    description: string
    websiteUrl:string
}
export type getAllPostsQueryModel = {
    sortBy: string
    sortDirection: string
    pageNumber: number
    pageSize: number
}
export type createPostInputModel = {
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

export type QueryBlogs = {
    sortDirection: string
    sortBy: string
    pageNumber: string
    pageSize: string
    searchNameTerm: string | null
}

export type QueryPosts = {
    sortDirection: string
    sortBy: string
    pageNumber: number
    pageSize: number
}

export type blogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string
}

export type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type blogDbType = {
    _id: Object,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string
}

export type postDbType = {
    _id: Object,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type blogsViewModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: blogType[]
}

export type postsViewModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: postType[]
}

export type paramsIdModel = {
    id: string
}

export type createUserInputModel = {
    login: string
    password: string
    email: string
}

export type getAllUsersQueryModel = {
    sortBy: string
    sortDirection: string
    pageNumber: string
    pageSize: string
    searchLoginTerm: string
    searchEmailTerm: string
}

export type userModel = {
    id: string
    login: string
    email: string
    createdAt: string
}

export type queryUsers = {
    sortDirection: string
    sortBy: string
    pageNumber: string
    pageSize: string
    searchLoginTerm: string | null
    searchEmailTerm: string | null
}
export type usersViewModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: userModel[]
}
export type userDbType = {
    _id: Object
    login: string,
    email: string,
    passwordHash: string,
    passwordSalt: string,
    createdAt: string
}
export type authInputModel = {
    loginOrEmail: string
    password: string
}
export type createCommentModel = {
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

export type getAllCommentsQueryModel = {
    sortBy: string
    sortDirection: string
    pageNumber: string
    pageSize: string
}

export type commentType = {
    id: string
    content: string
    createdAt: string
    userId: string
    userLogin: string
}
export type commentsViewModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: commentType []
}
