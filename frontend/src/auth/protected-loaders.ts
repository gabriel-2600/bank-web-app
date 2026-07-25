import { redirect } from "react-router";
import { getClientAccessToken, refreshApi } from "../api/clientApi";

export const protectedLoader = async () => {
  const ACCESS_TOKEN = getClientAccessToken();

  if (!ACCESS_TOKEN) {
    try {
      console.log("API CALL MADE");
      await refreshApi();
    } catch {
      return redirect("/login");
    }
  }
};
