import { logoutApi } from "../auth/api/logoutApi";
import { throwBackendError } from "../util/throw-backend-error";
import { errorToast } from "../util/toast-notifcation";
import { redirect } from "react-router";

type HttpMethods = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type BodyType = object | undefined;
interface RefreshResponse {
  accessToken: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
let ACCESS_TOKEN: string | null;
let isInitialized = false;
let callbackCopy: ((token: string | null) => void) | null = null;

export const refreshApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      setClientAccessToken(null);
      if (callbackCopy) {
        notifySetState(null);
      }

      return;
    }

    const data: RefreshResponse = await response.json();

    setClientAccessToken(data.accessToken);
    notifySetState(data.accessToken);

    return data.accessToken;
  } catch {
    setClientAccessToken(null);

    if (callbackCopy) {
      notifySetState(null);
    }

    return;
  } finally {
    isInitialized = true;
  }
};

function notifySetState(update: string | null) {
  if (!callbackCopy) {
    throw new Error("Call back is null");
  }

  callbackCopy(update);
}

export const setClientAccessToken = (token: string | null) => {
  ACCESS_TOKEN = token;
};

export const getClientAccessToken = () => ACCESS_TOKEN;

export const getIsInitialized = () => isInitialized;

export const registerCallback = (callback: (token: string | null) => void) => {
  callbackCopy = callback;
};

export const sendRequest = async (
  method: HttpMethods,
  endPoint: string,
  body: BodyType = undefined,
  retried = false,
) => {
  let response;

  try {
    if (body === undefined) {
      response = await fetch(`${BASE_URL}/api${endPoint}`, {
        mode: "cors",
        method: `${method}`,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        credentials: "include",
      });
    } else {
      response = await fetch(`${BASE_URL}/api${endPoint}`, {
        mode: "cors",
        method: `${method}`,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });
    }
  } catch {
    throw new Error("Server Down");
  }

  if (response.status === 401) {
    if (!retried) {
      try {
        await refreshApi();

        return sendRequest(method, endPoint, body, true);
      } catch (error) {
        setClientAccessToken(null);
        notifySetState(null);
        logoutApi();
        errorToast(error instanceof Error ? error.message : "Unauthenticated");

        return redirect("/login");
      }
    }

    setClientAccessToken(null);
    notifySetState(null);
    logoutApi();
    errorToast("Unauthenticated");

    return redirect("/login");
  }

  if (!response.ok) {
    await throwBackendError(response);
  }

  if (response.status === 204) {
    return;
  }

  const data = await response.json();

  return data;
};
