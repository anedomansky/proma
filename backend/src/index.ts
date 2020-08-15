import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { createAllTables, dropAllTables } from './db/dbConnection';
import { userController } from './controllers/userController';
import { roleController } from './controllers/roleController';
import { projectController } from './controllers/projectController';
import { taskController } from './controllers/taskController';
import { statusController } from './controllers/statusController';

dotenv.config();

const PORT = process.env.PORT || 4001;

// dropAllTables();
createAllTables();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/users', userController);
app.use('/roles', roleController);
app.use('/projects', projectController);
app.use('/tasks', taskController);
app.use('/status', statusController);

app.listen(PORT, () => {
    console.log(chalk.blue(`> Server is running on http://localhost:${PORT}`));
});
