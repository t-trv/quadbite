import express from "express";
import asyncHandler from "../libs/asyncHandler.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkRole from "../middlewares/checkRole.js";

import {
  getFoods,
  createFood,
  updateFood,
  deleteFood,
  getFood,
  checkExistingSlug,
  getFoodBySlug,
} from "../controllers/foods.controller.js";

const router = express.Router();

/**
 * @openapi
 * /api/foods/check-slug:
 *   get:
 *     summary: Check if a slug is already taken
 *     tags: [Foods]
 *     parameters:
 *       - name: slug
 *         in: query
 *         required: true
 *         description: The slug to check
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Slug check result
 *       "400":
 *         description: Bad request
 *       "500":
 *         description: Internal server error
 */
router.get("/check-slug", verifyToken, asyncHandler(checkExistingSlug));

/**
 * @openapi
 * /api/foods/slug/{slug}:
 *   get:
 *     summary: Get a food by slug
 *     tags: [Foods]
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         description: The slug of the food
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Food found successfully
 *       "404":
 *         description: Food not found
 *       "401":
 *         description: Unauthorized
 *       "500":
 *         description: Internal server error
 */
router.get("/slug/:slug", verifyToken, asyncHandler(getFoodBySlug));

/**
 * @openapi
 * /api/foods/{id}:
 *   get:
 *     summary: Get a food
 *     tags: [Foods]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the food
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Food found successfully
 *       "404":
 *         description: Food not found
 *       "401":
 *         description: Unauthorized
 *       "500":
 *         description: Internal server error
 */
router.get("/:id", verifyToken, asyncHandler(getFood));

/**
 * @openapi
 * /api/foods:
 *   get:
 *     summary: Get all foods
 *     tags: [Foods]
 *     parameters:
 *       - name: sideCategoryId
 *         in: query
 *         required: false
 *         description: The id of the side category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List foods
 *       400:
 *         description: Bad request
 */
router.get("/", verifyToken, asyncHandler(getFoods));

/**
 * @openapi
 * /api/foods:
 *   post:
 *     summary: Create a new food
 *     tags: [Foods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sideCategoryId:
 *                 type: string
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               preparationTime:
 *                 type: number
 *               description:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *               variantIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       "200":
 *         description: Food created successfully
 *       "400":
 *         description: Bad request
 */
router.post("/", verifyToken, checkRole("admin"), asyncHandler(createFood));

/**
 * @openapi
 * /api/foods/{id}:
 *   put:
 *     summary: Update a food
 *     tags: [Foods]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the food
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sideCategoryId:
 *                 type: string
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               preparationTime:
 *                 type: number
 *               description:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *               variantIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       "200":
 *         description: Updated food successfully
 *       "404":
 *         description: Food not found
 *       "401":
 *         description: Unauthorized
 *       "500":
 *         description: Internal server error
 */
router.put("/:id", verifyToken, checkRole("admin"), asyncHandler(updateFood));

/**
 * @openapi
 * /api/foods/{id}:
 *   delete:
 *     summary: Delete a food
 *     tags: [Foods]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the food
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Deleted food successfully
 *       "404":
 *         description: Food not found
 *       "401":
 *         description: Unauthorized
 *       "500":
 *         description: Internal server error
 */
router.delete("/:id", verifyToken, checkRole("admin"), asyncHandler(deleteFood));

export default router;
