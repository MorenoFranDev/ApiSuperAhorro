import jwt from "jsonwebtoken";
import { SecretCors, SecretJWT } from "../config.js";
import { User } from "../models/Users.js";
import { encryptPass, verifyPassword } from "../middleware/bcrypt.js";


export const loginGoogle = (req, res) => {
    const token = jwt.sign(req.user,SecretJWT) 
    res.redirect(`${SecretCors}/login/success?token=${token}`)
};

export const local_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userWithEmail = await User.findOne({
            where: { email },
        });
        console.log(userWithEmail)
        if (!userWithEmail) return res.status(500).json("error in user");
        const verify = await verifyPassword(password, userWithEmail.password);
        if (!verify) return res.status(500).json("error in passwors")

        const token = jwt.sign(
            {
                "fullName": userWithEmail.fullName,
                "range": userWithEmail.range,
                "email": userWithEmail.email,
                "Profle": userWithEmail.profile,
                "UserId": userWithEmail.id,
            },
            SecretJWT
        );
        return res.json({"token": token});
    } catch (error) {
        return res.status(500).json("Error in credentials")
    }
};
export const createUser = async (req, res) => {
    try {
        const { email, password, fullName, googleId } = req.body;
        const user = {
            password: await encryptPass(password),
            range: 2,
            googleId: googleId ?? new Date().getTime(),
            fullName: fullName,
            email,
            profile: null,
        };
        const resp = await User.findOne({ where: { email } });
        if (resp) return res.status(500).json({ msg: "Datos incorrectos o usuario existente" });
        const createUser = new User(user);
        const result = await createUser.save();
        const UserId = result.id
        console.log(UserId)
        const token = jwt.sign(
            { email: email, range: 2, fullName: fullName,UserId: UserId },
            SecretJWT
        );
        res.json({ token: token });
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "error in data" });
    }
};

export const GetData = (req, res) => {
    try {
        const Authorization = req.headers["authorization"].split(" ")[1];
        const token = jwt.verify(Authorization, SecretJWT);
        res.json(token);
    } catch (error) {
        res.json({ msg: "error in token" });
    }
};
