export interface RegisterHotelOwnerData {
    name: string;
    email: string;
    password: string;
  }
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  // Función para registrar un dueño de hotel
  export const registerHotelOwner = async (
    id: string, // El ID necesario para el endpoint
    data: RegisterHotelOwnerData
  ): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/hotel-owner/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register hotel owner");
      }
    } catch (error) {
      throw error;
    }
  };
  
  // Función para enviar el código de verificación
  export const sendVerificationCode = async (email: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/mail/sendRegister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to send verification code"
        );
      }
    } catch (error) {
      throw error;
    }
  };
  
  // Función para verificar el código de cuenta
  export const verifyCode = async (
    userId: string,
    code: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/verify-account/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Code verification failed");
      }
  
      const result = await response.json();
      return result.success; // Assuming the API responds with { success: true/false }
    } catch (error) {
      throw error;
    }
  };
  