import { createContext } from "react";
import { type LoginResponse } from "./authTypes";
import { useContext } from "react";

interface AuthContextType {
  accessToken: string | null;
  user: {
    userId: number;
    username: string;
  } | null;
  login: (response: LoginResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
