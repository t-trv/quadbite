import express from "express";
import asyncHandler from "../libs/asyncHandler.js";
import verifyToken from "../middlewares/verifyToken.js";

import { createAddress, getAddresses, updateAddress, deleteAddress } from "../controllers/addresses.controller.js";

const router = express.Router();

/**
 * @openapi
 * /api/addresses:
 *   get:
 *     summary: Get all addresses
 *     tags: [Addresses]
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: false
 *         description: The id of the user
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: Addresses found successfully
 *       "400":
 *         description: Bad request
 *       "500":
 *         description: Internal server error
 */
router.get("/", verifyToken, asyncHandler(getAddresses));

/**
 * @openapi
 * /api/addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 description: The id of the user
 *                 example: 1
 *               addressName:
 *                 type: string
 *                 description: The name of the address
 *                 example: Home
 *               receiptionName:
 *                 type: string
 *                 description: The name of the receiption
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 description: The phone number of the address
 *                 example: 1234567890
 *               addressLine:
 *                 type: string
 *                 description: The address line
 *                 example: 123 Main St
 *               city:
 *                 type: string
 *                 description: The city
 *                 example: New York
 *               district:
 *                 type: string
 *                 description: The district
 *                 example: Manhattan
 *     responses:
 *       "200":
 *         description: Address created successfully
 *       "400":
 *         description: Bad request
 *       "500":
 *         description: Internal server error
 */
router.post("/", verifyToken, asyncHandler(createAddress));

/**
 * @openapi
 * /api/addresses/{id}:
 *   put:
 *     summary: Update an address
 *     tags: [Addresses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the address
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the address
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 description: The phone number of the address
 *                 example: 1234567890
 *               addressLine:
 *                 type: string
 *                 description: The address line
 *                 example: 123 Main St
 *               city:
 *                 type: string
 *                 description: The city
 *                 example: New York
 *               district:
 *                 type: string
 *                 description: The district
 *                 example: Manhattan
 *     responses:
 *       "200":
 *         description: Address updated successfully
 *       "404":
 *         description: Address not found
 *       "400":
 *         description: Bad request
 *       "500":
 *         description: Internal server error
 */
router.put("/:id", verifyToken, asyncHandler(updateAddress));

/**
 * @openapi
 * /api/addresses/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Addresses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the address
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Address deleted successfully
 *       "404":
 *         description: Address not found
 *       "400":
 *         description: Bad request
 *       "500":
 *         description: Internal server error
 */
router.delete("/:id", verifyToken, asyncHandler(deleteAddress));

export default router;
