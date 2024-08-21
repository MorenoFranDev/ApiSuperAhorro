import { Router } from "express";
import { createUser, GetData, local_login } from "../controller/auth.js";
import passport from "passport";
import("../middleware/google.js")
passport.initialize()
const router = Router();

const setheader = (req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
}

router.get('/google', passport.authenticate("auth-google", { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate("google", {
  failureMessage: "Cannot login to Google, please try again later!",
  failureRedirect:"https://frontend-inky-rho.vercel.app/inicio-sesion",
  successRedirect: "https://frontend-inky-rho.vercel.app",
}), (req, res) => {
  console.log("\n\n\n\nLOGIN GOOGLE: ", req, "\n\n\n\n")
})


router.post('/inicio-sesion', local_login)
router.post('/register', createUser)
router.get('/token', GetData)

export default router;

