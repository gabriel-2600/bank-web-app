const ACCESS_TOKEN_KEY = "accessToken";

export const saveToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

  console.log("AUTHENTICATED");
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    return null;
  }

  console.log("RETRIEVED");
  return accessToken;
};

export const isAccessTokenPresent = () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return false;
  }

  console.log("PRESENT");
  return true;
};

export const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  console.log("REMOVED");
};
