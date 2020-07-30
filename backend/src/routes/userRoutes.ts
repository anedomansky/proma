import express from 'express';
import chalk from 'chalk';
import dbQuery from '../db/dbQuery';

export const userRoutes = express.Router();

// TODO: better status codes

userRoutes.route('/all').get(async (req, res) => {
    const query = `SELECT first_name, last_name, email, created_on FROM proma_user`;
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

userRoutes.route('/getByEmail').get(async (req, res) => {
    const { email } = req.params;
    const query = `SELECT first_name, last_name, email, password, created_on FROM proma_user WHERE email = "${email}"`;
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

userRoutes.route('/add').post(async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    // TODO: hash the password before saving it into the database
    const hashedPassword = password;
    const query = `INSERT INTO proma_user(id, first_name, last_name, email, password, created_on) VALUES(NULL, ?, ?, ?, ?, NULL)`;
    const values = [email, first_name, last_name, hashedPassword];
    try {
        const { rows } = await dbQuery.query(query, values);
        const dbResponse = rows[0];
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while creating the user:', error));
        return res.status(500).send(error);
    }
});

userRoutes.route('/login').post(async (req, res) => {
    const { email, password } = req.body;
    // TODO: implement me, check password - and send yeah or nay
});
