import {NextFunction, Request, Response} from "express";

export const canFindAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const {self} = res.locals;

    if (self.roles.includes("ADMIN") || (self.roles.includes("MODERATOR"))) {
        return next();
    }

    return res.status(403).json({message: "You're not allowed to view all users"});
}

export const canFindUser = (req: Request, res: Response, next: NextFunction) => {
    const {self} = res.locals;
    const {_id} = req.params;

    if (self.roles.includes("ADMIN") || (self.roles.includes("MODERATOR")) || _id === '@me' || _id === self._id.toString()) {
        res.locals.select = '+email';
        return next();
    }

    next();
}

export const canDeleteUser = (req: Request, res: Response, next: NextFunction) => {
    const {self} = res.locals;
    const {_id} = req.params;

    if (self.roles.includes("ADMIN") || _id === '@me' || _id === self._id.toString()) {
        return next();
    }

    return res.status(403).json({message: "You're not allowed to delete this user"});
}

export const canUpdateUser = (req: Request, res: Response, next: NextFunction) => {
    const {self} = res.locals;
    const {_id} = req.params;

    if (self.roles.includes("ADMIN") || _id === '@me' || _id === self._id.toString()) {
        return next();
    }

    return res.status(403).json({message: "You're not allowed to update this user"});
}

export const canUpdateUserRole = (req: Request, res: Response, next: NextFunction) => {
    const {self} = res.locals;
    const {roles} = req.body;

    if (!roles) return next();

    if (self.roles.includes("ADMIN")) {
        return next();
    }

    return res.status(403).json({message: "You're not allowed to update user roles"});
}

export const canUpdateUserPassword = (req: Request, res: Response, next: NextFunction) => {
    const {password} = req.body;

    if (!password) return next();

    return res.status(403).json({message: "You're not allowed to update user password"});
}

/**
 * LINK PERMISSIONS
 */

// Admin ou Owner
export const isLinkOwnerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const {self, link} = res.locals;

    // Si c'est son lien
    if (self._id.toString() === link.userId.toString()) return next();

    // Si l'utilisateur est admin
    if (self.roles.includes('ADMIN' || 'MODERATOR')) return next();

    // Sinon
    return res.status(403).json({message: "You're not allowed to read this link"});
}
