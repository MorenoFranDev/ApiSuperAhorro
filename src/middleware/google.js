import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { GOOGLE_CLIENT_ID, GOOGLE_SECRET, PassportCallbackURL, SecretJWT } from '../config.js';
import { User } from '../models/Users.js';
import { encryptPass } from './bcrypt.js';
import { CartShop } from '../models/CartShop.js';

passport.use("auth-google", new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET,
  callbackURL: PassportCallbackURL,
}, async (accessToken, refreshToken, profile, cb) => {
  const password = await encryptPass(profile.id)
  await CartShop.findAll()
  const default_user = {
    fullName: `${profile.name.givenName} ${profile.name.familyName}`,
    googleId: profile.id,
    email: profile.emails[0].value,
    profile: profile.photos[0].value,
    range: 2 //Range: 1 -> Admin, 2 -> Users, 3 -> Local
  }
  const newuser = await User.findOrCreate({ where: { googleId: profile.id }, defaults: {default_user, password} })
  if (!newuser) {
    cb (err,null)
  }
  cb (null, default_user)
}));

passport.serializeUser((user, cb)=>{
  cb(null,user)
})

passport.deserializeUser((obj, cb)=>{
  cb(null, obj)

})
