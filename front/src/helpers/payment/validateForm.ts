import { IPaymentData } from "@/interfaces/paymentDataForm";

const validateForm = (name: string, email: string) => {
  const newErrors: IPaymentData = {};
  if (!name!.trim()) {
    newErrors.name = "Name is required.";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/.test(name)) {
    newErrors.name = "Name can only contain letters and spaces.";
  }
  if (!email!.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email!)) {
    newErrors.email = "Invalid email format.";
  }
  if (Object.keys(newErrors).length > 0) return newErrors;
  else return {};
  // Devuelve true si no hay errores
};

export default validateForm;
