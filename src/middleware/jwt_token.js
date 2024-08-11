import jwt from "jsonwebtoken"
import { SecretJWT } from "../config.js";

export const JWT_Decode_admin = (req, res, next) => {
    // const Authorization = req.headers['authorization'].split(" ")[1];
    try {
        // const token = jwt.verify(Authorization, SecretJWT);
        // if (token.Range == 1) {
            next()
        // }
    } catch (error) {
        res.send("Error in credentials token")
    }
}
export const JWT_Decode_user = (req, res, next) => {
    // const Authorization = req.headers['authorization'].split(" ")[1];
    try {
        // const token = jwt.verify(Authorization, SecretJWT);
        // if (token.Range == 2) {
            next()
        // }
    } catch (error) {
        res.send("Error in credentials token")
    }

}