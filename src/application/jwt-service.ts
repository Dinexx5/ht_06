import {userDbType} from "../models/models";
import jwt from 'jsonwebtoken'
import {ObjectId} from "mongodb";
import {settings} from "../settings";



export const jwtService = {

    async createJWT(user: userDbType) {
        const token = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: "1h"})
        return token
    },


    async getUserIdByToken (token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return new ObjectId(result.userId)
        } catch (error) {
            return null
        }
    }

}