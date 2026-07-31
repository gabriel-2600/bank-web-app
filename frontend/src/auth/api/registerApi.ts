import { throwBackendError } from "../../util/throw-backend-error";

interface RegistrationInterface {
  fullName: string;
  username: string;
  password: string;
}

export const registerApi = async (registrationData: RegistrationInterface) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  let response;
  try {
    response = await fetch(`${BASE_URL}/api/auth/register`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(registrationData),
    });
  } catch {
    throw new Error("Server Down, please try again later");
  }

  if (!response.ok) {
    await throwBackendError(response);
  }

  return true;
};
