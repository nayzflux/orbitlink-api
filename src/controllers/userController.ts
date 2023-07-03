import {Request, Response} from "express";
import UserModel from "../models/userModel";
import {UpdateUserData} from "../schemas/userSchema";

export const findUser = async (req: Request, res: Response) => {
    const {user} = res.locals;
    return res.status(200).json(user);
}

export const findAllUsers = async (req: Request, res: Response) => {
    const users = await UserModel.find();
    return res.status(200).json(users);
}

export const updateUser = async (req: Request, res: Response) => {
    const {user} = res.locals;
    const data: UpdateUserData = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(user._id, data, {new: true, multi: true, upsert: true})
    return res.status(200).json(updatedUser);
}

export const deleteUser = async (req: Request, res: Response) => {
    const {user} = res.locals;
    const deletedUser = await UserModel.findByIdAndRemove(user._id)
    return res.status(200).json(deletedUser);
}


