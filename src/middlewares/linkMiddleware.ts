import {NextFunction, Request, Response} from "express";
import LinkModel from "../models/linkModel";
import mongoose from "mongoose";

export const resolveLink = async (req: Request, res: Response, next: NextFunction) => {
    const {query} = req.params;

    if (mongoose.isValidObjectId(query)) {
        const link = await LinkModel.findOne({_id: query });

        if (!link) return res.status(404).json({message: "This link doesn't exists"});

        res.locals.link = link;

        return next();
    } else {
        const link = await LinkModel.findOne({shortURL: query});

        if (!link) return res.status(404).json({message: "This link doesn't exists"});

        res.locals.link = link;

        return next();
    }
}