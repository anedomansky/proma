import express from 'express';
import chalk from 'chalk';
import dbQuery from '../db/dbQuery';

const projectTaskController = express.Router();

projectTaskController.route('/all').get(async (req, res) => {
    const query = 'SELECT protask.id as id, t.name as task, p.name as project FROM project_task as protask INNER JOIN task as t ON t.id=protask.task_id INNER JOIN project as p ON p.id=protask.project_id';
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            return res.status(404).send('No project tasks found!');
        }
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while fetching the project tasks:', error));
        return res.status(500).send(error);
    }
});

projectTaskController.route('/add').post(async (req, res) => {
    const { task, project } = req.body;
    const query = `INSERT INTO project_task(task_id, project_id) VALUES((SELECT id from task WHERE name='${task}'), (SELECT id from project WHERE name='${project}')) returning *`;
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse = rows[0];
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while creating the project task:', error));
        return res.status(500).send(error);
    }
});

export default projectTaskController;
