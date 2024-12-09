const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint allows you to create a new user in the system without a password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the new user.
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: The email address of the new user.
 *                 example: "john.doe@example.com"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The unique identifier of the created user.
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: The name of the user.
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       description: The email of the user.
 *                       example: "john.doe@example.com"
 *       400:
 *         description: Bad request, name or email is missing
 *       500:
 *         description: Internal server error
 */
router.post("/create", UserController.createUser);

module.exports = router;
