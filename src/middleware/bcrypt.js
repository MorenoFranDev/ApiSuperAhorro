import bcrypt from "bcrypt"

export const encryptPass = async (password)=>{
    const hash = await bcrypt.hash(password,10)
    return hash
}

export const verifyPassword = async (password, db_password)=>{
    const compare = await bcrypt.compare(password, db_password)
    return compare
}