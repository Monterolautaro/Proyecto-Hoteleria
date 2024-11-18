import { config} from "dotenv";
config({path: '.env'});

export const registerUser = async (userData: {
    name: string;
    lastname: string;
    birthday: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    const response = await fetch(`http://localhost:${process.env.BACKEND_PORT}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log(userData);
    
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }
  
    return response.json();
  };
  
  export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await fetch(`http://localhost:${process.env.BACKEND_PORT}/auth/signIn`, {
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
  