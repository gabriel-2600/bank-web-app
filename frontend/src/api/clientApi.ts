import { throwError } from "../util/throw-error";

interface refreshResponse {
  accessToken: string;
}

let accessToken: string | null;
let callbackCopy: ((token: string | null) => void) | null = null;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getApi = async (endPoint: string) => {
  const response = await fetch(`${BASE_URL}/api${endPoint}`, {
    mode: "cors",
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (response.status === 401) {
    refreshApi();
  }
};

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
    notifySetAccessToken(null);

    await throwError(response);
  }

  const data: refreshResponse = await response.json();

  console.log(data);
  setClientAccessToken(data.accessToken);
  notifySetAccessToken(data.accessToken);
};

export const setClientAccessToken = (token: string | null) => {
  accessToken = token;
  console.log("ACCESS TOKEN IS SET IN TYPESCRIPT: " + accessToken);
};

export const getClientAccessT0ken = () => accessToken;

export const registerCallback = (callback: (token: string | null) => void) => {
  callbackCopy = callback;
};

function notifySetAccessToken(update: string | null) {
  if (!callbackCopy) {
    console.error("Call back is null");
    throw new Error("Call back is null");
  }

  callbackCopy(update);
}
