import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { HashPassword } from "../utils/HashPassword.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";
import { findUserById, checkExistedUser, createUser, findUserByEmail } from "../models/users.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { setRefreshToken } from "../models/token.model.js";
import { comparePassword } from "../utils/isPasswordCorrect.js"


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await findUserById(userId)
        if (!user) {
            throw new ApiError(404, "User not found")
        }
        const refreshToken = generateRefreshToken(user.id, user.name)
        const accessToken = generateAccessToken(user.id, user.name)
        const token = await setRefreshToken(user.id, refreshToken)
        if (!token) {
            throw new ApiError(500, "Something went wrong while setting the token")
        }
        return { accessToken, refreshToken }
    } catch (error) {
        console.log("TOKEN ERROR:", error)
        throw new ApiError(500, error.message)
    }
}


const getCurrentUser = AsyncHandler(
    async (req,res) => {
        return res
            .status(200)
            .json(
                new ApiResponse(200, req?.user , "User fetched successfully")
            ) 
    }
)
const registerUser = AsyncHandler(
    async (req, res) => {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            throw new ApiError(400, "All fields are required")
        }

        const existedUser = await checkExistedUser(username, email);

        if (existedUser) {
            throw new ApiError(409, "User already exists")
        }

        const hashedPassword = await HashPassword(password)

        const user = await createUser(username, email, hashedPassword);

        const registeredUser = await findUserById(user.id)

        if (!registeredUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        return res.status(201).json(
            new ApiResponse(201, registeredUser, "User registered Successfully")
        )

    }
)

const loginUser = AsyncHandler(
    async (req, res) => {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            throw new ApiError(404, "User does not exist")
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid user credentials")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.id);

        const loggedInUser = await findUserById(user.id)

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "User logged In Successfully"
                )
            )

    }
)

const logoutUser = AsyncHandler(
    async (req, res) => {
        const deleteToken = await clearRefreshToken(req.user.id);

        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User logged Out"))

    }
)

export { getCurrentUser,registerUser,loginUser,logoutUser }