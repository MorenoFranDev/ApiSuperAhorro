import {config} from "dotenv"

config()

export const DATABASE_NAME = process.env.DATABASE_NAME
export const DATABASE_USER = process.env.DATABASE_USER
export const DATABASE_PASS = process.env.DATABASE_PASS
export const DATABASE_HOST = process.env.DATABASE_HOST
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID_CLIENT
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET_CLIENT
export const PassportCallbackURL = process.env.PassportCallbackURL 
export const  SecretJWT = process.env.SecretJWT
export const  SecretCors = process.env.SecretCORS
export const  SecretSesionKey = process.env.SesionSecretKey
export const AdminPass = process.env.AdminPassword
export const AdminCorreo = process.env.AdminCorreo
export const AdminGoogleId = process.env.AdminGoogleId