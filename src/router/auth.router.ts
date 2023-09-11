import express from "express";
import { login, logout, register } from "../controller/auth.controller";
import { validateRegister } from "../middleware/validate.auth";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
