export const throwBackendError = async (response: Response) => {
  let errorMessage = "Client Error, please try again later";

  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorMessage;
  } catch (err) {
    //
    console.error("Client Error ", err);
  }

  throw new Error(errorMessage);
};
