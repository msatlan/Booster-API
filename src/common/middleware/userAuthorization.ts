import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import { secret } from '../config/jwtSecret';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token: string;

    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.toString().startsWith('Bearer ')) {
        token = authHeader.toString().substring(7, authHeader.toString().length);
    } else {
        return res
            .status(401)
            .send({ message: 'No authorization header provided or invalid token' });
    }

    if (!token) {
        return res.status(401).send({ message: 'No token provided.' });
    }

    try {
        jwt.verify(token.toString(), secret.secret, (err) => {
            //check if token has expired or for other errors
            if (err) {
                console.log(err);
                return res.status(401).send({ message: 'Token expired' });
            }

            next();
        });
    } catch (ex) {
        res.send(ex);
    }
};
