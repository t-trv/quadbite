import express from "express";
import asyncHandler from "../libs/asyncHandler.js";
import { login, register, logout, me } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/me", asyncHandler(me));

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successfully
 *       400:
 *         description: Error
 */
router.post("/login", asyncHandler(login));
router.post("/register", asyncHandler(register));
router.post("/logout", asyncHandler(logout));

export default router;
