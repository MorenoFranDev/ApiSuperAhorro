import { Router } from "express";
import { createUser, GetData, local_login } from "../controller/auth.js";
import passport from "passport";
import("../middleware/google.js")
passport.initialize()
const router = Router();

const setheader = (req, res, next)=>{
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
}

router.get('/google',setheader, passport.authenticate('auth-google', { scope: ['profile', 'email'] }))
router.get('/google/redirect', passport.authenticate('auth-google'));

router.post('/inicio-sesion', local_login)
router.post('/register', createUser)
router.get('/token', GetData)

export default router;

