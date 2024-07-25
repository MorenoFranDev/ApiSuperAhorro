import jwt from "jsonwebtoken"
import { SecretJWT } from "../config.js"
import { User } from "../models/Users.js";

export const loginGoogle = (req, res) => {
    const token = jwt.sign({ user: req.user }, SecretJWT);
    console.log(req.user)
    res.redirect(`http://localhost:5173/login/success?token=${token}`)
}

export const getCredentials = async(req, res)=>{
    const AuthorizationToken = req.headers["authorization"]

    res.json(jwt.verify(AuthorizationToken,SecretJWT))
    }

export const local_login = async (req, res) => {
    const { email, password } = req.body
    const userWithEmail = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );
    await CartShop.findAll()
    if (!userWithEmail)
        res.state(500).send("Error in user or email")

    const verify = await verifyPassword(password, WithEmail.password)
    if (verify)
        res.state(500).send("Error in user or email")

    const token = jwt.sign({ "fullName": WithEmail.fullName, "Emails": WithEmail.email, "Profle": WithEmail.profile }, SecretJWT);
    const data_user = { "fullName": WithEmail.fullName, "Emails": WithEmail.email, "Profle": WithEmail.profile }
    res.json({ "token": token, "user": data_user })
}
