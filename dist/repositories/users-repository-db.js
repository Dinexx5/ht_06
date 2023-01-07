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
exports.usersRepository = void 0;
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
exports.usersRepository = {
    createUser(newDbUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.usersCollection.insertOne(newDbUser);
            return {
                id: newDbUser._id.toString(),
                login: newDbUser.login,
                email: newDbUser.email,
                createdAt: newDbUser.createdAt
            };
        });
    },
    findByLoginOrEmail(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.usersCollection.findOne({ $or: [{ email: loginOrEmail }, { login: loginOrEmail }] });
            return user;
        });
    },
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let _id = new mongodb_1.ObjectId(id);
            let result = yield db_1.usersCollection.deleteOne({ _id: _id });
            return result.deletedCount === 1;
        });
    },
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield db_1.usersCollection.findOne({ _id: userId });
            return user;
        });
    }
};
