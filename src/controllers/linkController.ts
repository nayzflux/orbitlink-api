import {Request, Response} from "express";
import {CreateLinkData} from "../schemas/linkSchema";
import LinkModel from "../models/linkModel";
import {generateRandomURL} from "../utils/utils";
import * as bcrypt from "bcrypt";

export const createLink = async (req: Request, res: Response) => {
    const { destinationURL, releaseDateEnabled, expirationDateEnabled, passwordProtectionEnabled, password, expirationDate, releaseDate}: CreateLinkData = req.body;
    const randomURL = generateRandomURL();
    const shortURL = req.body.shortURL || randomURL;
    const {self} = res.locals;

    if (shortURL) {
        if (await LinkModel.exists({shortURL})) return res.status(400).json({message: 'This short URL is already used, choose another one'});
    }

    try {
        const newLink = await LinkModel.create({shortURL, destinationURL, userId: self._id, releaseDateEnabled, expirationDateEnabled, passwordProtectionEnabled, password, expirationDate, releaseDate});

        console.log('Link created', newLink);

        return res.status(201).json(newLink);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Failed to create link'})
    }
}

export const updateLink = async (req: Request, res: Response) => {
    const data: CreateLinkData = req.body;
    const { link} = res.locals;

    // Si le ShortURL a changé
    if (data.shortURL !== link.shortURL) {
        if (await LinkModel.exists({shortURL: data.shortURL})) return res.status(400).json({message: 'This short URL is already used, choose another one'});
    }

    // Si le mot de passe est présent et qu'il est different alors le hashé
    // Sinon on garde la hash présnet
    if (data.password && (!await link.comparePassword(data.password))) {
        data.password = await bcrypt.hash(data.password, process.env.SALT_OR_ROUNDS || 10);
    } else {
        data.password = link.password;
    }


    try {
        const updatedLink = await LinkModel.findOneAndUpdate({_id: link._id}, data, {multi: true, upsert: true, new: true});

        console.log('Link updated', updatedLink);

        return res.status(200).json(updatedLink);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Failed to update link'})
    }
}



export const findAllLinks = async (req: Request, res: Response) => {
    const {self} = res.locals;

    try {
        const links = await LinkModel.find({userId: self._id});
        return res.status(200).json(links);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Failed to get all links'})
    }
}

export const findLink = async (req: Request, res: Response) => {
    const {link} = res.locals;
    return res.status(200).json(link)
}

export const deleteLink = async (req: Request, res: Response) => {
    const { link} = res.locals;

    try {
        const removedLink = await LinkModel.findOneAndRemove({_id: link._id});

        console.log('Link deleted', removedLink);

        return res.status(200).json(removedLink);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Failed to delete link'})
    }
}