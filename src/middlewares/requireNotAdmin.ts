import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTAccountPayload } from "../types/auth";

import { AccountRole } from "../types/roles";

export const requireNotAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  const authToken = auth!.split(" ")[1];

  try {
    const payload = jwt.verify(
      authToken!,
      process.env.JWT_KEY!
    ) as JWTAccountPayload;

    if (payload.role !== AccountRole.USER)
      return res.status(401).send({ err: "Unauthorized" });

    next();
  } catch (err) {
    return res.status(400).send({ err: "Bad request" });
  }
};
