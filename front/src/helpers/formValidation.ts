export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required.";
  } else if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }
  return undefined;
};

export const validateBirthday = (birthday: string): string | undefined => {
  const minYear = 1900;
  const currentDate = new Date();

  // Verifica si el valor ingresado puede convertirse en una fecha válida
  const enteredDate = new Date(birthday);

  if (!birthday) {
    return "Birthday is required.";
  } else if (isNaN(enteredDate.getTime())) {
    return "Please enter a valid date.";
  } else if (enteredDate.getFullYear() < minYear) {
    return "Please enter a date from a valid year range.";
  } else if (enteredDate > currentDate) {
    return "Date cannot be in the future.";
  }
  return undefined;
};



export const validatePassword = (password: string): string | undefined => {
  // Validación: al menos una minúscula, una mayúscula, un símbolo, y longitud mínima de 8 caracteres
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}|\[\]\\:";'<>?,./`~])(?=.{8,})/;

  if (!password) {
    return "Password is required.";
  } else if (password.length < 8) {
    return "Minimum 8 characters.";
  } else if (!passwordRegex.test(password)) {
    return "Must include upper, lower & symbol.";
  }
  return undefined;
};

export const validateName = (name: string): string | undefined => {
  const nameRegex = /^[a-zA-Z]+$/; // Solo letras
  if (!name) {
    return "First name is required.";
  } else if (!nameRegex.test(name)) {
    return "Only letters allowed.";
  }
  return undefined;
};

export const validateLastName = (lastName: string): string | undefined => {
  const lastNameRegex = /^[a-zA-Z]+$/; // Solo letras
  if (!lastName) {
    return "Last name is required.";
  } else if (!lastNameRegex.test(lastName)) {
    return "Only letters allowed.";
  }
  return undefined;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!confirmPassword) {
    return "Please confirm password.";
  } else if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  return undefined;
};
