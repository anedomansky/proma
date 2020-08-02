import express from 'express';
import chalk from 'chalk';
import dbQuery from '../db/dbQuery';

export const taskController = express.Router();

taskController.route('/all').get(async (req, res) => {
    const query = `SELECT * FROM task`;
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            return res.status(404).send('No tasks found!');
        }
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while fetching the tasks:', error));
        return res.status(500).send(error);
    }
});

taskController.route('/add').post(async (req, res) => {
    const { name, description, status } = req.body;
    const query = `INSERT INTO task(id, name, description, status) VALUES(NULL, ?, ?, ?)`;
    const values = [name, description, status];
    try {
        const { rows } = await dbQuery.query(query, values);
        const dbResponse = rows[0];
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while creating the project:', error));
        return res.status(500).send(error);
    }
});
