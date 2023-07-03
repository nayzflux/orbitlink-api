import userSchema, {signInUserSchema, updateUserDataSchema} from "../../schemas/userSchema";
import {NextFunction, Request, Response} from "express";

export const validateUserInput = (req: Request, res: Response, next: NextFunction) => {
    // Valider l'objet utilisateur
    try {
        console.log('Validating user input...')
        userSchema.parse(req.body);
    } catch (error: any) {
        console.log('User input validation failed request rejected')
        return res.status(400).json({ message: JSON.parse(error.message)[0].message });
    }

    console.log('User input validated')
    next();
};

export const validateSignInUserInput = (req: Request, res: Response, next: NextFunction) => {
    // Valider l'objet utilisateur
    try {
        console.log('Validating user input...')
        signInUserSchema.parse(req.body);
    } catch (error: any) {
        console.log('User input validation failed request rejected')
        return res.status(400).json({ message:  JSON.parse(error.message)[0].message });
    }

    console.log('User input validated')
    next();
};

export const validateUpdateUserInput = (req: Request, res: Response, next: NextFunction) => {
    // Valider l'objet utilisateur
    try {
        console.log('Validating user input...')
        updateUserDataSchema.parse(req.body);
    } catch (error: any) {
        console.log('User input validation failed request rejected')
        return res.status(400).json({ message: JSON.parse(error.message)[0].message });
    }

    console.log('User input validated')
    next();
};
