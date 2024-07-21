import jwt from "jsonwebtoken"
import { SecretJWT } from "../config.js"
export const loginGoogle = (req, res) => {
    const token = jwt.sign({ "GoogleId": req.googleId, "Emails": req.email, "Profle": req.profile }, SecretJWT)
    console.log(token)
    res.json(token)
}

export const local_login = async (req, res) => {
    const { email, password } = req.body
    const userWithEmail = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (!userWithEmail)
        res.state(500).send("Error in user or email")

    const verify = await verifyPassword(password, WithEmail.password)
    if (verify)
        res.state(500).send("Error in user or email")

    const token = jwt.sign({ "fullName": default_user.fullName, "Emails": default_user.email, "Profle": default_user.profile }, SecretJWT);
    res.json(token)
}