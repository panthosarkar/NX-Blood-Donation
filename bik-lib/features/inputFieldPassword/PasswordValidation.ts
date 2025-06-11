export const isValidPassword = (value: string): boolean => {
    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value); // Checks for at least one digit (0-9)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(value);; // Checks for at least one special character

    return hasLowercase && hasUppercase && hasNumber && hasSpecialChar;
};