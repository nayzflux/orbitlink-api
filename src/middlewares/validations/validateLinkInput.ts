import {NextFunction, Request, Response} from "express";
import {createLinkSchema, findLinkSchema} from "../../schemas/linkSchema";

export const validateCreateLinkInput = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Validating link input...')
        console.log(req.body)
        createLinkSchema.parse(req.body);
    } catch (error: any) {
        console.log('Link input validation failed request rejected')
        return res.status(400).json({ message: error.message });
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
        return res.status(400).json({ message: error.message });
    }

    console.log('Link input validated')
    next();
};