const ACCESS_TOKEN_KEY = "accessToken";

export const saveToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    return null;
  }

  console.log("PRESENT");
  return accessToken;
};

export const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};
