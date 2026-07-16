let clientAccessToken: string | null = null;

export const setNewToken = (token: string) => {
  clientAccessToken = token;
};
