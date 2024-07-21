import jwt from "jsonwebtoken"
import { SecretJWT } from "../config.js"
export const loginGoogle = (req, res) => {
    const token = jwt.sign({ "GoogleId": req.googleId, "Emails": req.email, "Profle": req.profile }, SecretJWT)
    console.log(token)
    res.json(token)
}