import express from 'express';
import chalk from 'chalk';
import dbQuery from '../db/dbQuery';

export const taskController = express.Router();

taskController.route('/all').get(async (req, res) => {
    const query = `SELECT t.id as id, t.name as name, t.description as description, s.name as status FROM task as t INNER JOIN status as s ON s.id=t.status_id`;
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
    const query = `INSERT INTO task(name, description, status_id) VALUES($1, $2, (SELECT id from status WHERE name='${status}')) returning *`;
    const values = [name, description];
    try {
        const { rows } = await dbQuery.query(query, values);
        const dbResponse = rows[0];
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while creating the task:', error));
        return res.status(500).send(error);
    }
});
