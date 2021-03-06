import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import userController from './controllers/userController';
import roleController from './controllers/roleController';
import projectController from './controllers/projectController';
import taskController from './controllers/taskController';
import statusController from './controllers/statusController';
import projectTaskController from './controllers/projectTaskController';
import userTaskController from './controllers/userTaskController';
import userProjectController from './controllers/userProjectController';

dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userController);
app.use('/roles', roleController);
app.use('/projects', projectController);
app.use('/tasks', taskController);
app.use('/status', statusController);
app.use('/projectTasks', projectTaskController);
app.use('/userTasks', userTaskController);
app.use('/userProjects', userProjectController);

app.listen(PORT, () => {
    console.log(chalk.blue(`> Server is running on http://localhost:${PORT}`));
});
