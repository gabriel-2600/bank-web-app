import { createContext } from "react";
import { type LoginResponse } from "./authTypes";

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (response: LoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
