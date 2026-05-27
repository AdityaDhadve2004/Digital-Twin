import jwt from "jsonwebtoken"
export const generateRefreshToken = async(id,username) => {
    return jwt.sign({
        id : id,
        username : username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
    )

}
export const generateAccessToken = async(id,username) => {
    return jwt.sign({
        id : id,
        username : username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
    )

}