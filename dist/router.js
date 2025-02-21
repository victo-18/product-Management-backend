"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("./handlers/product");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
//schema for swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: Product name
 *           example: Tablet Lenovo Yoga
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 3000
 *         availability:
 *           type: boolean
 *           description: Product availability
 *           example: true
 */
//ROUTING
router.get("/", product_1.getProducts);
/**
 *
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Product
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/:id", middleware_1.checkingId, product_1.getProductById);
/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Product
 *     description: Return a product based on unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to return
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad request - invalid ID
 */
router.post("/", middleware_1.handlerInputErrors, product_1.crearProduct);
/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a product in the database
 *     tags:
 *       - Product
 *     description: Returns a success message from the API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sample Product"
 *               price:
 *                 type: number
 *                 example: 300
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product created successfully"
 *       400:
 *         description: Bad request - Invalid input
 */
router.put("/:id", middleware_1.checkingId, middleware_1.handlerInputErrors, product_1.updataProduct);
/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Product
 *     description: Update a product with the unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Product"
 *               price:
 *                 type: number
 *                 example: 500
 *               availability:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product updated successfully"
 *       400:
 *         description: Bad request - Invalid input
 *       404:
 *         description: Product not found
 */
router.patch("/:id", middleware_1.checkingId, product_1.updataAvailability);
/**
 * @swagger
 * /api/product/{id}:
 *   patch:
 *     summary: Update the availability property
 *     tags:
 *       - Product
 *     description: Update the availability status of a product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Availability updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Availability updated successfully"
 *       400:
 *         description: Bad request - Invalid input
 *       404:
 *         description: Product not found
 */
router.delete("/:id", middleware_1.checkingId, product_1.deleteProduct);
/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Product
 *     description: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *       400:
 *         description: Bad request - Invalid input
 *       404:
 *         description: Product not found
 */
exports.default = router;
