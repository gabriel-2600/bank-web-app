import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { type LoginResponse } from "./authTypes";
import { setClientAccessToken, registerCallback } from "../api/clientApi";

interface AuthProviderInterface {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderInterface) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const isAuthenticated = accessToken !== null;

  const login = (response: LoginResponse) => {
    const ACCESS_TOKEN = response.accessToken;

    setAccessToken(ACCESS_TOKEN);
    setClientAccessToken(ACCESS_TOKEN);

    console.log("ACCESS TOKEN IS SET IN STATE: " + accessToken);
  };

  const logout = () => {
    setAccessToken(null);
    setClientAccessToken(null);

    console.log("LOGOUT SUCCESS: " + accessToken);
  };

  useEffect(() => {
    registerCallback((token: string | null) => {
      setAccessToken(token);
    });
  }, []);

  return (
    <AuthContext value={{ accessToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
