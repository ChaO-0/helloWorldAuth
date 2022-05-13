import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/User";
import { AccountLogin, AccountRegister } from "../../types/auth";
import { AccountRole } from "../../types/roles";

export const adminRegisterService = async ({
  email,
  username,
  password,
}: AccountRegister) => {
  const existingEmail = await User.findOne({ where: { email } });
  const existingUsername = await User.findOne({ where: { username } });

  if (existingEmail) return { data: { err: "Email exists" }, statusCode: 400 };
  if (existingUsername)
    return { data: { err: "Username exists" }, statusCode: 400 };

  const hashedPassword = await hash(password, 12);

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
    role: AccountRole.ADMIN,
  });

  const userJwt = jwt.sign(
    {
      username: user.toJSON().username,
      email: user.toJSON().email,
      role: user.toJSON().role,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: "2d",
    }
  );

  return {
    data: {
      token: userJwt,
    },
    statusCode: 200,
  };
};

export const adminLoginService = async ({ email, password }: AccountLogin) => {
  const existingUser = await User.findOne({
    where: { email, role: AccountRole.ADMIN },
  });
  if (!existingUser)
    return { data: { err: "Invalid credentials" }, statusCode: 400 };

  const passwordsMatch = await compare(password, existingUser.password);

  if (!passwordsMatch)
    return { data: { err: "Invalid credentials" }, statusCode: 400 };

  // Generate JWT
  const userJwt = jwt.sign(
    {
      username: existingUser.username,
      role: existingUser.role,
      email: existingUser.email,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: "2d",
    }
  );

  return { data: { token: userJwt }, statusCode: 200 };
};
