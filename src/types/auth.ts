import { AccountRole } from "./roles";

export interface AccountRegister {
  email: string;
  username: string;
  password: string;
}

export interface AccountLogin {
  email: string;
  password: string;
}

export interface JWTAccountPayload {
  username: string;
  email: string;
  role: AccountRole;
}
