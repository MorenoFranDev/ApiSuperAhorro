import { Router } from "express";
import { loginGoogle } from "../controller/auth.js";
import passport from "passport";
import("../middleware/google.js")
passport.initialize()
const router = Router();

router.get('/google',passport.authenticate('auth-google', { scope: ['profile', 'email'] }))
router.get('/google/redirect', loginGoogle);

export default router;

