import express from 'express';
import chalk from 'chalk';
import dbQuery from '../db/dbQuery';
import bcrypt from 'bcrypt';

export const userController = express.Router();

userController.route('/all').get(async (req, res) => {
    const query = `SELECT first_name as firstName, last_name as lastName, email, created_on as createdOn, is_admin as isAdmin FROM proma_user`;
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            return res.status(404).send('No users found!');
        }
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while fetching the users:', error));
        return res.status(500).send(error);
    }
});

userController.route('/getByEmail/:email').get(async (req, res) => {
    const { email } = req.params;
    const query = `SELECT first_name as firstName, last_name as lastName, email, created_on as createdOn, is_admin as isAdmin FROM proma_user WHERE email = '${email}'`;
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            return res.status(404).send('No user found!');
        }
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while fetching the user:', error));
        return res.status(500).send(error);
    }
});

userController.route('/add').post(async (req, res) => {
    const { email, firstName, lastName, password, isAdmin } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const query = `INSERT INTO proma_user(first_name, last_name, email, password, created_on, is_admin) VALUES($1, $2, $3, $4, DEFAULT, $5) returning *`;
    const values = [firstName, lastName, email, hashedPassword, isAdmin];
    try {
        const { rows } = await dbQuery.query(query, values);
        const dbResponse = rows[0];
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while creating the user:', error));
        return res.status(500).send(error);
    }
});

userController.route('/login').post(async (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT password FROM proma_user WHERE email = '${email}'`;
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            return res.status(404).send('No user found!');
        }
        if (bcrypt.compareSync(password, dbResponse[0].password)) {
            return res.status(200).send('LOGIN_SUCCESS');
        } else {
            return res.status(403).send('WRONG_CREDENTIALS');
        }
    } catch (error) {
        console.error(chalk.red('An error occurred while fetching the user:', error));
        return res.status(500).send(error);
    }
});
