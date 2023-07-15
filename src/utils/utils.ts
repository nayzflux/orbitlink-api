import * as fs from "fs";

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

export const loadJsonArrayFromFile = (filePath: string) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const jsonArray = content.split('\n');

    return jsonArray;
}

export function formatNumber(number: number) {
    if (number < 1000) {
        return number.toString();
    } else if (number < 1000000) {
        return (number / 1000).toFixed(1) + "k";
    } else {
        return (number / 1000000).toFixed(1) + "m";
    }
}