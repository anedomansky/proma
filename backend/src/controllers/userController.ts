import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dbQuery from '../db/dbQuery';
import { User } from '../interfaces/User';
import { UserDB } from '../interfaces/UserDB';

dotenv.config();

const userController = express.Router();

userController.route('/all').get(async (req, res) => {
    const query = 'SELECT first_name, last_name, email, created_on, is_admin FROM proma_user';
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse: User[] = rows;
        if (!dbResponse[0]) {
            return res.status(404).send({ message: 'No users found!' });
        }
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while fetching the users:', error));
        return res.status(500).send({ message: error.message });
    }
});

userController.get('/getByEmail/:email', (req, res, next) => {
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
}, async (req, res) => {
    const { email } = req.params;
    const query = 'SELECT first_name, last_name, email, created_on, is_admin FROM proma_user WHERE email = $1';
    try {
        const { rows } = await dbQuery.query(query, [email]);
        const dbResponse: User = rows[0];
        if (!dbResponse) {
            return res.status(404).send({ message: 'No user found!' });
        }
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while fetching the user:', error));
        return res.status(500).send({ message: error.message });
    }
});

userController.route('/register').post(async (req, res) => {
    const {
        email, firstName, lastName, password, isAdmin,
    } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const query = 'INSERT INTO proma_user(first_name, last_name, email, password, created_on, is_admin) VALUES($1, $2, $3, $4, DEFAULT, $5) returning *';
    const values = [firstName, lastName, email, hashedPassword, isAdmin];
    try {
        const { rows } = await dbQuery.query(query, values);
        const dbResponse: UserDB = rows[0];
        const userResponse: User = {
            firstName: dbResponse.first_name,
            lastName: dbResponse.last_name,
            email: dbResponse.email,
            createdOn: dbResponse.created_on,
            isAdmin: dbResponse.is_admin,
        };
        return res.status(200).send(userResponse); // this returns just the "email"-field because of database = first_name and reponse = firstName
    } catch (error) {
        console.error(chalk.red('An error occurred while creating the user:', error));
        return res.status(500).send({ message: error.message });
    }
});

userController.route('/login').post(async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT first_name, last_name, email, password, is_admin FROM proma_user WHERE email = $1';
    try {
        const { rows } = await dbQuery.query(query, [email]);
        const dbResponse: UserDB = rows[0];
        if (!dbResponse) {
            return res.status(404).send({ message: 'NO_USER_FOUND', token: '' });
        }
        if (bcrypt.compareSync(password, dbResponse.password as string)) {
            const secret = process.env.SECRET;
            const userResponse: User = {
                firstName: dbResponse.first_name,
                lastName: dbResponse.last_name,
                email: dbResponse.email,
                createdOn: dbResponse.created_on,
                isAdmin: dbResponse.is_admin,
            };
            const token = jwt.sign(userResponse, secret as string, { expiresIn: 60 }); // 60 = 60 seconds, 1h, 3d
            return res.status(200).send({ message: 'LOGIN_SUCCESS', token, user: userResponse });
        }
        return res.status(403).send({ message: 'WRONG_CREDENTIALS', token: '' });
    } catch (error) {
        console.error(chalk.red('An error occurred while fetching the user:', error));
        return res.status(500).send({ message: error.message });
    }
});

export default userController;
