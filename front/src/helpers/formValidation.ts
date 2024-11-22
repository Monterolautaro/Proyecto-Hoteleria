export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required";
  } else if (!emailRegex.test(email)) {
    return "Please enter a valid email address (must include '@' and domain)";
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  // Expresión regular que valida:
  // - Al menos una letra minúscula
  // - Al menos una letra mayúscula
  // - Al menos un símbolo
  // - Al menos 8 caracteres de longitud
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}|\[\]\\:";'<>?,./`~])(?=.{8,})/;

  if (!password) {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password must be at least 8 characters";
  } else if (!passwordRegex.test(password)) {
    return "Password must contain at least one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long";
  }
  return undefined;
};


export const validateName = (name: string): string | undefined => {
  const nameRegex = /^[a-zA-Z]+$/; // Solo letras
  if (!name) {
    return "First name is required";
  } else if (!nameRegex.test(name)) {
    return "First name should only contain letters";
  }
  return undefined;
};

export const validateLastName = (lastName: string): string | undefined => {
  const lastNameRegex = /^[a-zA-Z]+$/; // Solo letras
  if (!lastName) {
    return "Last name is required";
  } else if (!lastNameRegex.test(lastName)) {
    return "Last name should only contain letters";
  }
  return undefined;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!confirmPassword) {
    return "Please confirm your password";
  } else if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return undefined;
};
