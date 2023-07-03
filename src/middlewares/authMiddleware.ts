import {NextFunction, Response, Request} from "express";
import {verifyToken} from "../utils/jwt";
import UserModel from "../models/userModel";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: 'Missing token' });

    const decoded = verifyToken(token);

    if (!decoded) return res.status(403).json({ message: 'Invalid token' });

    // @ts-ignore
    const self = await UserModel.findById(decoded?._id).select('+email');

    if (!self) return res.status(404).json({ message: "User doesn't exists" });

    res.locals.self = self;
    next();
}