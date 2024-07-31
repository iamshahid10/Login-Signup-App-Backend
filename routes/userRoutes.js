import express from "express";
import { editUser, login, signup } from "../Controller/userController.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login)
router.post('/editUser',editUser)

export default router;