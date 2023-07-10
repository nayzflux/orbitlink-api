import {NextFunction, Request, Response} from "express";
import {createLinkSchema, findLinkSchema, updateLinkSchema} from "../../schemas/linkSchema";

export const validateCreateLinkInput = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Validating link input...')
        createLinkSchema.parse(req.body);
    } catch (error: any) {
        console.log('Link input validation failed request rejected')
        return res.status(400).json({ message: JSON.parse(error.message)[0].message });
    }

    console.log('Link input validated')
    next();
};

export const validateUpdateLinkInput = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Validating link input...')
        updateLinkSchema.parse(req.body);
    } catch (error: any) {
        console.log('Link input validation failed request rejected')
        return res.status(400).json({ message: JSON.parse(error.message)[0].message });
    }

    console.log('Link input validated')
    next();
};

export const validateFindLinkInput = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Validating link input...')
        findLinkSchema.parse(req.params);
    } catch (error: any) {
        console.log('Link input validation failed request rejected')
        return res.status(400).json({ message: JSON.parse(error.message)[0].message });
    }

    console.log('Link input validated')
    next();
};