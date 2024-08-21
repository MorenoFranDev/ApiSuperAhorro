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
  scope: ['email','profile'],
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    const default_user = {
      fullName: `${profile.name.givenName} ${profile.name.familyName}`,
      googleId: profile.id,
      email: profile.emails[0].value,
      profile: profile.photos[0].value,
      range: 2
    }
    const password = await encryptPass(profile.id)
    const user = await User.findOrCreate({
      where: { googleId: profile.id }, defaults: {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        googleId: profile.id,
        email: profile.emails[0].value,
        profile: profile.photos[0].value,
        range: 2,
        password
      }
    })
    const token = jwt.sign(default_user, SecretJWT);
    return cb(null, { token })
  } catch (error) {
    return cb(error)
  }

}));

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)

})
