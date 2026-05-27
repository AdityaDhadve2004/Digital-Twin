import jwt from "jsonwebtoken"
export const generateRefreshToken = async(id,username) => {
    return jwt.sign({
        id : id,
        username : username
    },
    process.env.
    )

}