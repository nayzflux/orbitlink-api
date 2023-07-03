export const validateSafeInput = (input: any) => {
    const dangerousCharacters = ['<', '>', '&', '\'', '"', '`'];
    return !dangerousCharacters.some((char) => input?.includes(char));
};

export const validateSecurePassword = (input: any) => {
    // Vérifier les critères de sécurité du mot de passe
    const hasUppercase = /[A-Z]/.test(input);
    const hasLowercase = /[a-z]/.test(input);
    const hasDigit = /\d/.test(input);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(input);

    return hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
};