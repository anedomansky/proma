import express from 'express';
import chalk from 'chalk';
import dbQuery from '../db/dbQuery';

export const statusController = express.Router();

statusController.route('/all').get(async (req, res) => {
    const query = `SELECT * FROM status`;
    try {
        const { rows } = await dbQuery.query(query);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            return res.status(404).send('No status found!');
        }
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while fetching the status:', error));
        return res.status(500).send(error);
    }
});

statusController.route('/add').post(async (req, res) => {
    const { name } = req.body;
    const query = `INSERT INTO status(name) VALUES($1) returning *`;
    const values = [name];
    try {
        const { rows } = await dbQuery.query(query, values);
        const dbResponse = rows[0];
        return res.status(200).send(dbResponse);
    } catch (error) {
        console.error(chalk.red('An error occurred while creating the status:', error));
        return res.status(500).send(error);
    }
});
