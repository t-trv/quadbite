import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import asyncHandler from "../libs/asyncHandler.js";
import checkRole from "../middlewares/checkRole.js";

import { orderPreview, createOrder, getOrderById, getOrders, updateOrder } from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/:orderId", verifyToken, asyncHandler(getOrderById));

router.get("/", verifyToken, checkRole(["admin", "staff"]), asyncHandler(getOrders));

router.post("/preview", verifyToken, asyncHandler(orderPreview));

router.post("/", verifyToken, asyncHandler(createOrder));

router.put("/:orderId", verifyToken, checkRole(["admin", "staff"]), asyncHandler(updateOrder));

export default router;
