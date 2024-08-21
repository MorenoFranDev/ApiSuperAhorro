import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { GOOGLE_CLIENT_ID, GOOGLE_SECRET, PassportCallbackURL, SecretCors, SecretJWT } from '../config.js';
import { User } from '../models/Users.js';
import { encryptPass } from './bcrypt.js';
import jwt from "jsonwebtoken"

passport.use("auth-google", new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET,
  callbackURL: PassportCallbackURL,
  scope: ['email', 'profile'],
}, async (accessToken, refreshToken, profile, cb) => {
  const password = await encryptPass(profile.id)
  const default_user = {
    password,
    fullName: `${profile.name.givenName} ${profile.name.familyName}`,
    googleId: profile.id,
    email: profile.emails[0].value,
    profile: profile.photos[0].value,
    range: 2 //Range: 1 -> Admin, 2 -> Users, 3 -> Local
  }
  const newuser = await User.findOrCreate({ where: { googleId: profile.id }, defaults: default_user, attributes: ["id","range","googleId","fullName","email","profile"] })
  if (!newuser) {
    return (null, false, { message: 'Error in google acount' })
  }
  return cb(null, newuser);
}));





















passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)

})
