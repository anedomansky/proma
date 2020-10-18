import express from 'express';
import chalk from 'chalk';
import dbQuery from '../db/dbQuery';

const userTaskController = express.Router();

userTaskController.route('/all').get(async (req, res) => {
    const query = 'SELECT usertask.id as id, prouser.first_name as first_name, prouser.last_name as last_name, prouser.email as email, t.name as task FROM user_task as usertask INNER JOIN task as t ON t.id=usertask.task_id INNER JOIN proma_user as prouser ON prouser.id=usertask.proma_user_id';
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            return res.status(404).send('No user tasks found!');
        }
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while fetching the user tasks:', error));
        return res.status(500).send(error);
    }
});

userTaskController.route('/add').post(async (req, res) => {
    const { user, task } = req.body;
    const query = `INSERT INTO user_task(proma_user_id, task_id) VALUES((SELECT id from proma_user WHERE email='${user}'), (SELECT id from task WHERE name='${task}')) returning *`;
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse = rows[0];
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while creating the user task:', error));
        return res.status(500).send(error);
    }
});

export default userTaskController;
