import {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import UserModel from "../models/userModel";

export const resolveUser = async (req: Request, res: Response, next: NextFunction) => {
    const {_id} = req.params;
    const {self} = res.locals;

    if (!_id) return res.status(400).json({message: "Please give an ID"});

    if (_id === '@me') {
        res.locals.user = self;
        console.log('me')
        return next();
    }

    if (!mongoose.isValidObjectId(_id)) return res.status(400).json({message: "This ID isn't valid"});

    const user = await UserModel.findById(_id).select(res.locals.select);


    if (!user) return res.status(404).json({message: "This user doesn't exists"});

    res.locals.user = user;
    next();
}