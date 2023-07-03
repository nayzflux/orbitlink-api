import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'Secret'

export const signToken = (payload: any) => {
    return jwt.sign(payload, SECRET, {expiresIn: '30d'});
}

export const verifyToken = (token: any) => {
    return jwt.verify(token, SECRET);
}
