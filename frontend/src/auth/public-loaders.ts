import { redirect } from "react-router";
import {
  getClientAccessToken,
  getIsInitialized,
  refreshApi,
} from "../api/clientApi";

export const publicLoader = async () => {
  const token = getClientAccessToken();
  const isInitialized = getIsInitialized();

  if (isInitialized && token) {
    return redirect("/app");
  }

  if (isInitialized && !token) {
    return null;
  }

  try {
    const newToken = await refreshApi();
    if (newToken) {
      return redirect("/app");
    }
  } catch (error) {
    console.error("ERROR: " + error);
  }

  return null;
};
