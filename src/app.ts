import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import sequelize from "./database";

import { requireAuth } from "./middlewares/requireAuth";

import { adminAuthRouter } from "./routes/auth/admin";
import { userAuthRouter } from "./routes/auth/user";
import { adminHelloWorld } from "./routes/helloWorld/admin";
import { userHelloWorld } from "./routes/helloWorld/user";

export const app = express();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello world",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts"],
};
const specs = swaggerJSDoc(options);

sequelize.sync();

// documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// jsonifier
app.use(express.json());

// unprotected routes
app.use(adminAuthRouter);
app.use(userAuthRouter);

// protector middleware
app.use(requireAuth);

// protected Routes
app.use(adminHelloWorld);
app.use(userHelloWorld);
