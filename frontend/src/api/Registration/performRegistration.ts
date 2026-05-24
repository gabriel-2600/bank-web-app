interface RegistrationData {
  fullName: string;
  username: string;
  password: string;
}

export const performRegistration = async (
  registrationData: RegistrationData,
) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });

  if (!response.ok) {
    let errorMessage = "Server error, please try again later";

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (err) {
      //
      console.error(err);
    }

    throw new Error(errorMessage);
  }

  return true;
};
