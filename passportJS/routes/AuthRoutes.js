import express from 'express'
import { signup, signin, signout, home } from '../controllers/AuthController.js'
import { isLogin } from '../middlewares/AuthMiddleware.js';
import passport from 'passport'

const router = express.Router();

router.post("/api/signup", signup);
router.post("/api/signin", passport.authenticate("local"), signin);
router.get("/api/signout", signout);

router.get("/api/home", isLogin, home);

export default router;