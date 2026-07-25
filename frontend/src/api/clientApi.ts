import { throwError } from "../util/throw-error";

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
  console.log("ACCESS TOKEN IS SET IN clientApi.ts LINE 63: " + ACCESS_TOKEN);
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

  if (response.status === 401) {
    if (!retried) {
      await refreshApi();

      return sendRequest(method, endPoint, body, true);
    } else {
      setClientAccessToken(null);
      notifySetState(null);

      await throwError(response);
    }
  } else if (!response.ok) {
    await throwError(response);
  }

  const data = await response.json();
  console.log(data);

  return data;
};
