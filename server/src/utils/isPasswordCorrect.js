import bcrypt from "bcrypt"
const isPasswordCorrect = async (password,hashedPassword) => {
    return await bcrypt.compare(password,hashedPassword)
}