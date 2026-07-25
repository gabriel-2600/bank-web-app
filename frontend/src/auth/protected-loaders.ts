import { redirect } from "react-router";
import { getClientAccessToken } from "../api/clientApi";

export const protectedLoader = async () => {
  const token = getClientAccessToken();

  if (!token) {
    console.log("BAWAL KA DITO BOY");
    return redirect("/login");
  }

  return null;
};
