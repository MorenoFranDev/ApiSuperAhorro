import { Router } from "express";
import { createUser, GetData, local_login, loginGoogle } from "../controller/auth.js";
import passport from "passport";
import("../middleware/google.js")
passport.initialize()
const router = Router();

router.get('/google', passport.authenticate('auth-google', { scope: ['profile', 'email'] }))
router.get('/google/redirect',passport.authenticate('auth-google', { session: false }), loginGoogle);

router.post('/inicio-sesion', local_login)
router.post('/register', createUser)
router.get('/token', GetData)

export default router;

