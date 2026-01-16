import express from 'express'
import { signin, signup,home } from '../controller/AuthController.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.get("/home",home);

export default router;