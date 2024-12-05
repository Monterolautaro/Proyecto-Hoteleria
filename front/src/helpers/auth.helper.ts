// import { config } from "dotenv";
// config({ path: ".env" });

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (userData: {
  name: string;
  lastname: string;
  birthday: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  console.log("Works", userData);

  const response = await fetch(`${API_URL}/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message || "Registration failed");
  }

  return response.json();
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_URL}/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};
