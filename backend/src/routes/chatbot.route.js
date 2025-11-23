import express from "express";
import { chatWithChatbot } from "../controllers/chatbot.controller.js";
import asyncHandler from "../libs/asyncHandler.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, asyncHandler(chatWithChatbot));

export default router;
