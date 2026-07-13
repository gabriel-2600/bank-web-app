import { redirect } from "react-router";
import { isAccessTokenPresent } from "./tokenStorage";

export async function protectedLoader() {
  const isAuthenticated = isAccessTokenPresent();

  if (!isAuthenticated) {
    return redirect("/login");
  }

  return null;
}
