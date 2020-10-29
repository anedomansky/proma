import chalk from 'chalk';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import { User } from '../interfaces/User';

dotenv.config();

const verifyToken: RequestHandler = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }
    try {
        const secret = process.env.SECRET;
        const decoded: User = jwt.verify(token as string, secret as string) as User;
        req.body = {
            email: decoded.email,
            createdOn: decoded.createdOn,
            isAdmin: decoded.isAdmin,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
        };
        next();
    } catch (error) {
        console.error(chalk.red('Authentication failed:', error));
        return res.status(500).send({ message: error.message });
    }
};

export default verifyToken;
