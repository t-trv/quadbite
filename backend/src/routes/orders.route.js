import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import asyncHandler from "../libs/asyncHandler.js";

import { orderPreview } from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/preview", verifyToken, asyncHandler(orderPreview));

export default router;
