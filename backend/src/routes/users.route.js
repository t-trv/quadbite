import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import checkRole from "../middlewares/checkRole.js";
import asyncHandler from "../libs/asyncHandler.js";

import { getUsers, createUser, updateUser, deleteUser, getUser } from "../controllers/users.controller.js";

import { getOrdersByUserId } from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/", verifyToken, checkRole("admin"), getUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng
 *     description: Lấy thông tin người dùng theo id
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 *                 deleted_at:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: integer
 *       401:
 *         description: Không xác thực
 *       403:
 *         description: Không có quyền
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.get("/:id", verifyToken, getUser);
router.post("/", createUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

router.get("/:id/orders", verifyToken, asyncHandler(getOrdersByUserId));

export default router;
