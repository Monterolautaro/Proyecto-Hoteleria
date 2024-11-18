export const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    } else if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return undefined;
  };
  
  export const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return undefined;
  };
  
  export const validateName = (name: string): string | undefined => {
    if (!name) {
      return "First name is required";
    }
    return undefined;
  };
  
  export const validateLastName = (lastName: string): string | undefined => {
    if (!lastName) {
      return "Last name is required";
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
  