import express from "express";
import { botController } from "../controller/bot.controller";

const router = express.Router();

router.post("/", botController);

export default router;
