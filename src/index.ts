import { app } from "./app";
import sequelize from "./database";

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be provided");

  try {
    await sequelize.authenticate();
    console.log("success");
  } catch (e) {
    console.error(e);
  }

  app.listen(8080, async () => {
    console.log("listening at port 8080");
  });
};

start();
