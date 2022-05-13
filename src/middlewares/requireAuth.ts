import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).send({ err: "Not authorized" });

  const authToken = auth.split(" ")[1];

  try {
    const isAuth = jwt.verify(authToken, process.env.JWT_KEY!);

    console.log(isAuth);

    if (!isAuth) return res.status(401).send({ err: "Not Authorized" });

    next();
  } catch (err) {
    return res.status(401).send({ err: "Bad request" });
  }
};
