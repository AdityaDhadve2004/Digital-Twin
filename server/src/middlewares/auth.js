import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import {findUserById} from "../models/users.model.js"
export const verifyJWT = AsyncHandler(
    async (req, res, next) => {
        try {
            const token = req.cookies?.accessToken
            if (!token) {
                throw new ApiError(401, "Unauthorized request")
            }
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const user = await findUserById(decodedToken?.id)

            if (!user) {
                throw new ApiError(401, "Invalid Access Token")
            }

            req.user = user;
            next()

        } catch (error) {
            throw new ApiError(401,error?.message || "Invalid access token")

        }

    }
)