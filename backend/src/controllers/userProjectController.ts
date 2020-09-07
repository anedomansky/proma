import express from 'express';
import chalk from 'chalk';
import dbQuery from '../db/dbQuery';

export const userProjectController = express.Router();

userProjectController.route('/all').get(async (req, res) => {
    const query = `SELECT userproject.id as id, prouser.first_name as first_name, prouser.last_name as last_name, prouser.email as email, p.name as project, r.name as role FROM user_project as userproject INNER JOIN proma_user as prouser ON prouser.id=userproject.proma_user_id INNER JOIN project as p ON p.id=userproject.project_id INNER JOIN role as r ON r.id=userproject.role_id`;
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            return res.status(404).send('No user projects found!');
        }
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while fetching the user projects:', error));
        return res.status(500).send(error);
    }
});

userProjectController.route('/add').post(async (req, res) => {
    const { user, project, role } = req.body;
    const query = `INSERT INTO user_project(proma_user_id, project_id, role_id) VALUES((SELECT id from proma_user WHERE email='${user}'), (SELECT id from project WHERE name='${project}'), (SELECT id from role WHERE name='${role}')) returning *`;
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse = rows[0];
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while creating the user project:', error));
        return res.status(500).send(error);
    }
});
