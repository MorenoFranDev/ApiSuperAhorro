import { Router } from "express";
import { local_login, loginGoogle } from "../controller/auth.js";
import passport from "passport";
import("../middleware/google.js")
passport.initialize()
const router = Router();

router.get('/google', passport.authenticate('auth-google', { scope: ['profile', 'email'] }))
router.get('/google/redirect', loginGoogle);
router.post('/login', passport.authenticate('local-login'),local_login)
export default router;

