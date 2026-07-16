import { useState } from "react";
import AuthContext from "./AuthContext";
import { type LoginResponse } from "./authTypes";
import { setNewToken } from "../api/clientApi";

interface AuthProviderInterface {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderInterface) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const isAuthenticated = accessToken !== null;

  const login = (response: LoginResponse) => {
    const ACCESS_TOKEN = response.accessToken;

    setAccessToken(ACCESS_TOKEN);
    setNewToken(ACCESS_TOKEN);
  };

  const logout = () => {
    setAccessToken(null);
  };

  return (
    <AuthContext value={{ accessToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
