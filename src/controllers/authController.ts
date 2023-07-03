import {Request, Response} from "express";
import {SignInUserData, User} from "../schemas/userSchema";
import UserModel from "../models/userModel";
import {signToken} from "../utils/jwt";


export const signUp = async (req: Request, res: Response) => {
    const { username, email, password }: User = req.body;

    // If email already in use
    if (await UserModel.exists({email})) return res.status(400).json({message: 'This email is already used'})

    try {
        const newUser = await UserModel.create({username, password, email});

        const token = signToken({_id: newUser._id});

        console.log('User created', newUser.email);

        res.cookie('jwt', token);
        return res.status(201).json({_id: newUser._id, username: newUser.username, email: newUser.email, roles: newUser.roles});
    } catch (error) {
        return res.status(500).json({message: 'Failed to create user'})
    }
}

export const signIn = async (req: Request, res: Response) => {
    const { email, password }: SignInUserData = req.body;

    try {
        const user = await UserModel.findOne({email}).select('+password +email');

        if (!user) return res.status(404).json({message: 'This user does not exists'});

        // @ts-ignore
        const doesPasswordMatch = await user.comparePassword(password);

        if (!doesPasswordMatch) return res.status(403).json({message: "Password doesn't match"});

        const token = signToken({_id: user._id});

        console.log('User logged', user.email);

        res.cookie('jwt', token);
        return res.status(200).json({_id: user._id, username: user.username, email: user.email, roles: user.roles});
    } catch (error) {
        return res.status(500).json({message: 'Failed to log user'})
    }
}