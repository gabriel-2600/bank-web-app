import { errorHandler } from "../../util/error-handler";

interface RegistrationInterface {
  fullName: string;
  username: string;
  password: string;
}

export const performRegistration = async (
  registrationData: RegistrationInterface,
) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });

  if (!response.ok) {
    await errorHandler(response);
  }

  return true;
};
