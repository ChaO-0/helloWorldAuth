import express from "express";
import { body } from "express-validator";

import { validateRequest } from "../../middlewares/validateRequest";

import { userLogin, userRegister } from "../../controllers/auth/userController";

const router = express.Router();

/**
 * @swagger
 *
 * /api/user/register:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: object
 *         schema:
 *            type: object
 *            properties:
 *               username:
 *                   type: string
 *                   description: The user's username
 *                   example: Putu Pram
 *               password:
 *                   type: string
 *                   description: The user's password
 *                   example: puki
 *               email:
 *                   type: string
 *                   description: The user's email
 *                   example: puki
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *               username:
 *                   type: string
 *                   description: The user's username
 *                   example: Putu Pram
 *               password:
 *                   type: string
 *                   description: The user's password
 *                   example: puki
 *               email:
 *                   type: string
 *                   description: The user's email
 *                   example: puki
 *     responses:
 *         200:
 *          description: User registered successfully
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The User JWT
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJnc3Q3MTExIiwicm9sZSI6IkFETUlOIiwiZW1haWwiOiJiZ3N0NzExMSIsImlhdCI6MTY1MjQ2NjA5NiwiZXhwIjoxNjUyNjM4ODk2fQ.Fiil__Tp26L6c5uuzWKBD8PPRGmqXMFvR75DmO4xwMI
 *         400:
 *           description: Email / Username already exists
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  err:
 *                    type: string
 *                    description: The error message
 *                    example: Email exists
 */
router.post(
  "/api/user/register",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  userRegister
);

/**
 * @swagger
 *
 * /api/user/login:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: object
 *         schema:
 *            type: object
 *            properties:
 *               password:
 *                   type: string
 *                   description: The user's password
 *                   example: puki
 *               email:
 *                   type: string
 *                   description: The user's email
 *                   example: puki
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *               password:
 *                   type: string
 *                   description: The user's password
 *                   example: puki
 *               email:
 *                   type: string
 *                   description: The user's email
 *                   example: puki
 *     responses:
 *         200:
 *          description: Admin signed in successfully
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The User JWT
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJnc3Q3MTExIiwicm9sZSI6IkFETUlOIiwiZW1haWwiOiJiZ3N0NzExMSIsImlhdCI6MTY1MjQ2NjA5NiwiZXhwIjoxNjUyNjM4ODk2fQ.Fiil__Tp26L6c5uuzWKBD8PPRGmqXMFvR75DmO4xwMI
 *         400:
 *           description: Invalid Email / Username
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  err:
 *                    type: string
 *                    description: The error message
 *                    example: Email exists
 */
router.post(
  "/api/user/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  userLogin
);

export { router as userAuthRouter };
