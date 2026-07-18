import { throwError } from "../../util/throw-error";

interface RegistrationInterface {
  fullName: string;
  username: string;
  password: string;
}

export const registerApi = async (registrationData: RegistrationInterface) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(registrationData),
  });

  if (!response.ok) {
    await throwError(response);
  }

  return true;
};
