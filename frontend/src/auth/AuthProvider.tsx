import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { type LoginResponse } from "./authTypes";
import { setClientAccessToken, registerCallback } from "../api/clientApi";
import type { UserInterface } from "../types/UserInterface";

interface AuthProviderInterface {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderInterface) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInterface | null>(null);

  const login = (response: LoginResponse) => {
    const ACCESS_TOKEN = response.accessToken;
    const USER = response.user;

    setAccessToken(ACCESS_TOKEN);
    setClientAccessToken(ACCESS_TOKEN);
    setUser(USER);
  };

  const logout = () => {
    setAccessToken(null);
    setClientAccessToken(null);
    setUser(null);
  };

  useEffect(() => {
    registerCallback((token: string | null) => {
      setAccessToken(token);
    });
  }, []);

  return (
    <AuthContext value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
