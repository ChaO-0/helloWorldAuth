import { Request, Response } from "express";

import {
  adminLoginService,
  adminRegisterService,
} from "../../services/auth/adminService";

export const adminRegister = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const { data, statusCode } = await adminRegisterService({
    email,
    username,
    password,
  });

  return res.status(statusCode).send(data);
};

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, statusCode } = await adminLoginService({
    email,
    password,
  });

  return res.status(statusCode).send(data);
};
