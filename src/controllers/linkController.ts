import {Request, Response} from "express";
import {CreateLinkData} from "../schemas/linkSchema";
import LinkModel from "../models/linkModel";

export const createLink = async (req: Request, res: Response) => {
    const {longUrl, customPath}: CreateLinkData = req.body;
    const {self} = res.locals;

    if (customPath) {
        if (await LinkModel.exists({customPath})) return res.status(400).json({message: 'This custom path is already used, choose another one'});
    }

    try {
        const newLink = await LinkModel.create({longUrl, customPath, userId: self._id});

        console.log('Link created', newLink);

        return res.status(201).json(newLink);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Failed to create link'})
    }
}

export const findLink = async (req: Request, res: Response) => {
    const {link} = res.locals;
    return res.status(200).json(link)
}