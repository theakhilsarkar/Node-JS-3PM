import express from 'express'
import { updateUser, getAllUsers } from '../controllers/admin_controller.js'

const router = express.Router();

// router.post("/add-user", addUser);
router.post("/update-user", updateUser);
router.get("/get-users", getAllUsers);

export default router;