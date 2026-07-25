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
    console.log("STAY HERE IN APP");
    return redirect("/app");
  }

  if (isInitialized && !token) {
    console.log("STAY IN PUBLIC");
    return null;
  }

  try {
    const newToken = await refreshApi();
    if (newToken) {
      console.log("REDIRECT IN APP");
      return redirect("/app");
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};
