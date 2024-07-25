import { Router } from "express";
import { getCredentials, local_login, loginGoogle } from "../controller/auth.js";
import passport from "passport";
import("../middleware/google.js")
passport.initialize()
const router = Router();

const successLoginUrl = "http://localhost:5173/login/success";
const errorLoginUrl = "http://localhost:5173/auth/login";

router.get('/google', passport.authenticate('auth-google', { scope: ['profile', 'email'] }))
router.get('/google/redirect', passport.authenticate('auth-google'), loginGoogle);
router.get('/login/credentials', getCredentials)
router.post('/login', passport.authenticate('local-login'),)
export default router;

