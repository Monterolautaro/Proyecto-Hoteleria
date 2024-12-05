export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required.";
  } else if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }
  return undefined;
};

// Validación simplificada para contraseñas en el login
export const validatePasswordLogin = (
  email: string,
  password: string
): string | undefined => {
  if (!password) {
    return "Password is required.";
  } else if (email) {
    // Aquí simplemente se muestra un mensaje genérico,
    // ya que la lógica está en el backend.
    // return "The password does not match the email.";
  }
  return undefined;
};

// Validación de cumpleaños
export const validateBirthday = (birthday: string): string | undefined => {
  const minYear = 1900;
  const currentDate = new Date();
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

// Validación de contraseñas para registro
export const validatePassword = (password: string): string | undefined => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}|\[\]\\:";'<>?,./`~])(?=.{8,})/;

  if (!password) {
    return "Password is required.";
  } else if (password.length < 8) {
    return "Minimum 8 characters.";
  } else if (!passwordRegex.test(password)) {
    return "Must include upper, lower & symbol.";
  }
  return undefined;
};

// Validación de nombres
export const validateName = (name: string): string | undefined => {
  const nameRegex = /^[a-zA-Z]+$/;
  if (!name) {
    return "First name is required.";
  } else if (!nameRegex.test(name)) {
    return "Only letters allowed.";
  }
  return undefined;
};

// Validación de apellidos
export const validateLastName = (lastName: string): string | undefined => {
  const lastNameRegex = /^[a-zA-Z]+$/;
  if (!lastName) {
    return "Last name is required.";
  } else if (!lastNameRegex.test(lastName)) {
    return "Only letters allowed.";
  }
  return undefined;
};

// Validación de confirmación de contraseñas
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
