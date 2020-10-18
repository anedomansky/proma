import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dbQuery from '../db/dbQuery';
import { User } from '../interfaces/User';
import { UserResponse } from '../interfaces/UserResponse';

dotenv.config();

const userController = express.Router();

userController.route('/all').get(async (req, res) => {
    const query = 'SELECT first_name as firstName, last_name as lastName, email, created_on as createdOn, is_admin as isAdmin FROM proma_user';
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

userController.route('/getByEmail/:email').get(async (req, res) => {
    const { email } = req.params;
    const query = 'SELECT first_name as firstName, last_name as lastName, email, is_admin as isAdmin FROM proma_user WHERE email = $1';
    try {
        const { rows } = await dbQuery.query(query, [email]);
        const dbResponse: UserResponse = rows[0];
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
    console.log(chalk.bgCyanBright(req.body.email));
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
        const dbResponse: User = rows[0];
        const userResponse: UserResponse = {
            firstName: dbResponse.firstName,
            lastName: dbResponse.lastName,
            email: dbResponse.email,
            isAdmin: dbResponse.isAdmin,
        };
        return res.status(200).send(userResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while creating the user:', error));
        return res.status(500).send({ message: error.message });
    }
});

userController.route('/login').post(async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT first_name as firstName, last_name as lastName, email, password, is_admin as isAdmin FROM proma_user WHERE email = $1';
    try {
        const { rows } = await dbQuery.query(query, [email]);
        const dbResponse: User = rows[0];
        if (!dbResponse) {
            return res.status(404).send({ message: 'NO_USER_FOUND', token: '' });
        }
        if (bcrypt.compareSync(password, dbResponse.password)) {
            const secret = process.env.SECRET;
            const userResponse: UserResponse = {
                firstName: dbResponse.firstName,
                lastName: dbResponse.lastName,
                email: dbResponse.email,
                isAdmin: dbResponse.isAdmin,
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
