import { redirect } from "react-router";
import { isAccessTokenPresent } from "./tokenStorage";

export async function publicLoader() {
  const isAuthenticated = isAccessTokenPresent();

  if (isAuthenticated) {
    return redirect("/app");
  }

  return null;
}
