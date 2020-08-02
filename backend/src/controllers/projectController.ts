import express from 'express';
import chalk from 'chalk';
import dbQuery from '../db/dbQuery';

export const projectController = express.Router();

projectController.route('/all').get(async (req, res) => {
    const query = `SELECT * FROM project`;
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            return res.status(404).send('No projects found!');
        }
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while fetching the projects:', error));
        return res.status(500).send(error);
    }
});

projectController.route('/add').post(async (req, res) => {
    const { name } = req.body;
    const query = `INSERT INTO project(id, name) VALUES(NULL, ?)`;
    const values = [name];
    try {
        const { rows } = await dbQuery.query(query, values);
        const dbResponse = rows[0];
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while creating the role:', error));
        return res.status(500).send(error);
    }
});
