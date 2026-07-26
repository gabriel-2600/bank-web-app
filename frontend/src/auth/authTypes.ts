import type { UserInterface } from "../types/UserInterface";

export interface LoginResponse {
  accessToken: string;
  user: UserInterface;
}
