import { throwError } from "../util/throw-error";

type HttpMethods = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type BodyType = object | undefined;
interface RefreshResponse {
  accessToken: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
let ACCESS_TOKEN: string | null;
let callbackCopy: ((token: string | null) => void) | null = null;

const refreshApi = async () => {
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
    notifySetState(null);

    await throwError(response);
  }

  const data: RefreshResponse = await response.json();

  console.log(data);
  setClientAccessToken(data.accessToken);
  notifySetState(data.accessToken);
};

export const setClientAccessToken = (token: string | null) => {
  ACCESS_TOKEN = token;
  console.log("ACCESS TOKEN IS SET IN TYPESCRIPT: " + ACCESS_TOKEN);
};

export const getClientAccessT0ken = () => ACCESS_TOKEN;

export const registerCallback = (callback: (token: string | null) => void) => {
  callbackCopy = callback;
};

function notifySetState(update: string | null) {
  if (!callbackCopy) {
    console.error("Call back is null");
    throw new Error("Call back is null");
  }

  callbackCopy(update);
}

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

      throwError(response);
    }
  } else if (!response.ok) {
    throwError(response);
  }

  const data = await response.json();
  console.log(data);

  return data;
};
