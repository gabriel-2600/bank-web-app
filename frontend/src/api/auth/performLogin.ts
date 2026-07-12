import { errorHandler } from "../../util/error-handler";
import { type LoginResponse } from "../../auth/authTypes";

interface LoginInterface {
  username: string;
  password: string;
}

export const performLogin = async (loginData: LoginInterface) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    await errorHandler(response);
  }

  const data: LoginResponse = await response.json();
  console.log(data);

  return data;
};
