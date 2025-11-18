import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import checkRole from "../middlewares/checkRole.js";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", verifyToken, checkRole("admin"), getUsers);
router.get("/:id", verifyToken, getUser);
router.post("/", createUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
