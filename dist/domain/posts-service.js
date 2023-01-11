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
exports.postsService = void 0;
const posts_repository_db_1 = require("../repositories/posts-repository-db");
exports.postsService = {
    createPost(postBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_db_1.postsRepository.createPost(postBody);
        });
    },
    createPostForSpecifiedBlog(body, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postBody = Object.assign(Object.assign({}, body), { blogId });
            return yield posts_repository_db_1.postsRepository.createPost(postBody);
        });
    },
    deletePostById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_db_1.postsRepository.deletePostById(postId);
        });
    },
    UpdatePostById(postId, postBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_db_1.postsRepository.UpdatePostById(postId, postBody);
        });
    }
};
