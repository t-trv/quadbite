import express from "express";
import asyncHandler from "../libs/asyncHandler.js";
import {
  getMainCategories,
  getSideCategories,
  createSideCategory,
  updateSideCategory,
  deleteSideCategory,
} from "../controllers/categories.controller.js";

import { getFoodsByMainCategory } from "../controllers/foods.controller.js";

const router = express.Router();

/**
 * @openapi
 * /api/categories/main:
 *   get:
 *     summary: Get all main categories
 *     tags: [Categories]
 *     responses:
 *       "200":
 *         description: Main categories
 *       "500":
 *         description: Internal server error
 */
router.get("/main", asyncHandler(getMainCategories));

/**
 * @openapi
 * /api/categories/main/{mainCategoryId}/foods:
 *   get:
 *     summary: Get all foods by main category
 *     tags: [Foods]
 *     parameters:
 *       - name: mainCategoryId
 *         in: path
 *         required: true
 *         description: The main category id
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Foods by main category
 *       "500":
 *         description: Internal server error
 */
router.get("/main/:mainCategoryId/foods", asyncHandler(getFoodsByMainCategory));

/**
 * @openapi
 * /api/categories/side:
 *   get:
 *     summary: Get all side categories
 *     tags: [Categories]
 *     parameters:
 *       - name: mainCategoryId
 *         in: query
 *         required: false
 *         description: The main category id
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Side categories
 *       "500":
 *         description: Internal server error
 */
router.get("/side", asyncHandler(getSideCategories));

/**
 * @openapi
 * /api/categories/side:
 *   post:
 *     summary: Create a new side category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mainCategoryId:
 *                 type: string
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - mainCategoryId
 *               - id
 *               - name
 *     responses:
 *       "200":
 *         description: Side category created
 *       "400":
 *         description: Existing id or main category not found
 *       "500":
 *         description: Internal server error
 */
router.post("/side", asyncHandler(createSideCategory));

/**
 * @openapi
 * /api/categories/side/{id}:
 *   put:
 *     summary: Update a side category
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The side category id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mainCategoryId:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - mainCategoryId
 *               - name
 *     responses:
 *       "200":
 *         description: Side category updated
 *       "400":
 *         description: Side category not found
 *       "500":
 *         description: Internal server error
 */
router.put("/side/:id", asyncHandler(updateSideCategory));

/**
 * @openapi
 * /api/categories/side/{id}:
 *   delete:
 *     summary: Delete a side category
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The side category id
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Side category deleted
 *       "400":
 *         description: Side category not found
 *       "500":
 *         description: Internal server error
 */
router.delete("/side/:id", asyncHandler(deleteSideCategory));

export default router;
