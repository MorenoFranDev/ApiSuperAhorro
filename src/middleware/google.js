import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { GOOGLE_CLIENT_ID, GOOGLE_SECRET, PassportCallbackURL, SecretCors, SecretJWT } from '../config.js';
import { User } from '../models/Users.js';
import { encryptPass } from './bcrypt.js';
import { CartShop } from '../models/CartShop.js';

passport.use("auth-google", new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET,
  callbackURL: PassportCallbackURL,
}, async (accessToken, refreshToken, profile, cb) => {
  const default_user = {
    fullName: `${profile.name.givenName} ${profile.name.familyName}`,
    googleId: profile.id,
    email: profile.emails[0].value,
    profile: profile.photos[0].value,
    range: 2 //Range: 1 -> Admin, 2 -> Users, 3 -> Local
  }
  const user = await User.findOne({ where: { googleId: profile.id } })
  console.log("Usurio encontrado: ", default_user)
  if (user) {
    const token = jwt.sign({ default_user }, SecretJWT);
    return res.redirect(`${SecretCors}/login/success?token=${token}`);
  }
  const password = await encryptPass(profile.id)
  const newuser = new User({ default_user, password })
  await newuser.save()
  if (user) {
    const token = jwt.sign({ default_user }, SecretJWT);
    return res.redirect(`${SecretCors}/login/success?token=${token}`);
  }
}));

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)

})
