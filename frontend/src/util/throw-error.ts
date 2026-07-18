export const throwError = async (response: Response) => {
  let errorMessage = "Server error, please try again later";

  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorMessage;
  } catch (err) {
    //
    console.error(err);
  }

  throw new Error(errorMessage);
};
