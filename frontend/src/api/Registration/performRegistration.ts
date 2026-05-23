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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};
