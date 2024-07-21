import { User } from "../models/User";
import passport from ("passport");

passport.use(new LocalStrategy(
    async function (username, password, done) {
        const user = await User.findOne({ username: username })
        if (!user) {
            return done(null, false, { message: 'User or Password incorrect' })
        }
        const verify = await verifyPassword(password, user.password)
        if (!verify) {
            return done(null, false, { message: 'User or Password incorrect' })

        }
        return done(null, user, { message: 'User correct' })
    }
));
