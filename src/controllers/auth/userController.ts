import { Request, Response } from "express";

import {
  userLoginService,
  userRegisterService,
} from "../../services/auth/userService";

export const userRegister = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const { data, statusCode } = await userRegisterService({
    email,
    username,
    password,
  });

  return res.status(statusCode).send(data);
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, statusCode } = await userLoginService({
    email,
    password,
  });

  return res.status(statusCode).send(data);
};
