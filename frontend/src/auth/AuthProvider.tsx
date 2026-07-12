import { useState } from "react";
import AuthContext from "./AuthContext";
import { type LoginResponse } from "./authTypes";
import { saveToken, getAccessToken, clearToken } from "./tokenStorage";

interface AuthProviderInterface {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderInterface) {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getAccessToken(),
  );
  const isAuthenticated = accessToken !== null;

  const login = (response: LoginResponse) => {
    const ACCESS_TOKEN = response.accessToken;

    saveToken(ACCESS_TOKEN);
    setAccessToken(ACCESS_TOKEN);
    console.log("ACCESS TOKEN SAVED✅");
  };

  const logout = () => {
    clearToken();
    setAccessToken(null);

    console.log("ACCESS TOKEN CLEARED✅");
  };

  return (
    <AuthContext value={{ accessToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
