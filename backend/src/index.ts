import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { createAllTables, dropAllTables } from './db/dbConnection';

dotenv.config();

const PORT = process.env.PORT || 4001;

createAllTables();
// dropAllTables();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(chalk.blue(`> Server is running on http://localhost:${PORT}`));
});
