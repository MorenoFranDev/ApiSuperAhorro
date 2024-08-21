import { Router } from "express";
import { createUser, GetData, local_login, loginGoogle } from "../controller/auth.js";
import passport from "passport";
import("../middleware/google.js")
passport.initialize()
const router = Router();

const setheader = (req, res, next)=>{
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
}

router.get('/google',setheader, passport.authenticate('auth-google'))
router.get('/google/redirect', setheader, passport.authenticate('auth-google', { scope: ['profile', 'email'] }),(req, res) => {
  console.log("\n\n\n\nLOGIN GOOGLE: ", req,"\n\n\n\n")
  const { token } = req.authInfo || {};
  if (token) {
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});


router.post('/inicio-sesion', local_login)
router.post('/register', createUser)
router.get('/token', GetData)

export default router;

