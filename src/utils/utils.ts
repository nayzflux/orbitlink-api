export const validateSafeInput = (input: any) => {
    if (input === "") return true;

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

export const generateRandomURL = () => {
    var caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var longueur = 6;
    var resultat = '';

    for (var i = 0; i < longueur; i++) {
        var indiceAleatoire = Math.floor(Math.random() * caracteres.length);
        var caractere = caracteres.charAt(indiceAleatoire);
        resultat += caractere;
    }

    return resultat;
}
