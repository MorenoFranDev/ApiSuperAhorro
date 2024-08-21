import jwt from "jsonwebtoken";
import { SecretCors, SecretJWT } from "../config.js";
import { User } from "../models/Users.js";
import { encryptPass, verifyPassword } from "../middleware/bcrypt.js";


export const loginGoogle = (req, res) => {
    console.log(req.user)
    res.json(req.user);
};

export const local_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userWithEmail = await User.findOne({
            where: { email },
        });
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
        console.log({ token: token });
        return done(null, { token });
    } catch (error) {
        return res.json("Error in credentials")
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
        if (resp) return res.json({ msg: "Datos incorrectos o usuario existente" });
        const createUser = new User(user);
        await createUser.save();
        const token = jwt.sign(
            { email: email, range: 2, fullName: fullName },
            SecretJWT
        );
        console.log("\n\n\n\ntoken: ", token);
        res.json({ token: token });
    } catch (error) {
        res.status(500).json({ msg: "error in data" });
    }
};

export const GetData = (req, res) => {
    try {
        const Authorization = req.headers["authorization"].split(" ")[1];
        const token = jwt.verify(Authorization, SecretJWT);
        console.log(token)
        res.json({ user: token });
    } catch (error) {
        res.json({ msg: "error in token" });
    }
};
