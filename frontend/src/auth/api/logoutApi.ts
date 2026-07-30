import { throwBackendError } from "../../util/throw-backend-error";

export const logoutApi = async () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${BASE_URL}/api/auth/logout`, {
    mode: "cors",
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    await throwBackendError(response);
  }
};
