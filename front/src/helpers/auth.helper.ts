import axios from "axios";

export const registerUser = async (userData: {
  name: string;
  lastname: string;
  birthday: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await axios.post("http://localhost:3000/auth/signUp", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

  
export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await fetch("http://localhost:3000/auth/signIn", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }
  
    return response.json(); 
  };
  