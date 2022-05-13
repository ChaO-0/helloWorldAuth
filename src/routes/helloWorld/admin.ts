import express from "express";
// import { requireAdmin } from "../../middlewares/requireAdmin";

const router = express.Router();

/**
 * @swagger
 * /api/admin/helloWorld:
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
 *                   example: Hello World Admin
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
router.get("/api/admin/helloWorld", async (req, res) =>
  res.send({ message: "Hello World Admin" })
);

export { router as adminHelloWorld };
