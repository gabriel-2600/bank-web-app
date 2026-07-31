import { redirect } from "react-router";
import { refreshApi, getClientAccessToken } from "../api/clientApi";

export const protectedLoader = async () => {
  const token = getClientAccessToken();

  if (token) {
    return null;
  }

  try {
    const newToken = await refreshApi();
    if (!newToken) {
      return redirect("/login");
    }
  } catch (error) {
    console.error("ERROR: ", error);
    return redirect("/login");
  }

  return null;
};
