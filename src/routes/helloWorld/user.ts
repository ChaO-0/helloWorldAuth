import express from "express";
import { requireNotAdmin } from "../../middlewares/requireNotAdmin";

const router = express.Router();

/**
 * @swagger
 * /api/user/helloWorld:
 *   get:
 *     security:
 *         - bearerAuth: []
 *     summary: Retrieves a Hello World message.
 *     description: Retrieves an authorized Hello World message based on your role.
 *     responses:
 *       200:
 *         description: Hello World message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World User
 *       400:
 *         description: Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   example: Not Authorized
 */
router.get("/api/user/helloWorld", requireNotAdmin, async (req, res) =>
  res.send({ message: "Hello World User" })
);

export { router as userHelloWorld };
