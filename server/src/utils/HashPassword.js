import bcrypt from "bcrypt"
export const HashPassword = async (password)=>{
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}