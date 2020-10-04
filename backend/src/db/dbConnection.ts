import chalk from 'chalk';
import pool from './pool';

pool.on('connect', () => {
    console.log(chalk.blue('> Connected to database.'));
});

const createPromaUserTable = async (): Promise<void> => {
    try {
        const createQuery = `CREATE TABLE IF NOT EXISTS proma_user
            (id SERIAL PRIMARY KEY, 
            first_name VARCHAR(100), 
            last_name VARCHAR(100), 
            email VARCHAR(100) UNIQUE NOT NULL, 
            password VARCHAR(100) NOT NULL,
            created_on DATE NOT NULL DEFAULT CURRENT_DATE,
            is_admin BOOLEAN NOT NULL)`;
        const result = await pool.query(createQuery);
        console.log(chalk.green(result.command, '\n> Created the proma_user table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not create the table: ', error));
    }
};

const createRoleTable = async (): Promise<void> => {
    try {
        const createQuery = `CREATE TABLE IF NOT EXISTS role
            (id SERIAL PRIMARY KEY, 
            name VARCHAR(50) UNIQUE NOT NULL)`;
        const result = await pool.query(createQuery);
        console.log(chalk.green(result.command, '\n> Created the role table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not create the table: ', error));
    }
};

const createProjectTable = async (): Promise<void> => {
    try {
        const createQuery = `CREATE TABLE IF NOT EXISTS project
            (id SERIAL PRIMARY KEY, 
            name VARCHAR(50) UNIQUE NOT NULL)`;
        const result = await pool.query(createQuery);
        console.log(chalk.green(result.command, '\n> Created the project table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not create the table: ', error));
    }
};

const createStatusTable = async (): Promise<void> => {
    try {
        const createQuery = `CREATE TABLE IF NOT EXISTS status
            (id SERIAL PRIMARY KEY, 
            name VARCHAR(50) UNIQUE NOT NULL)`;
        const result = await pool.query(createQuery);
        console.log(chalk.green(result.command, '\n> Created the status table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not create the table: ', error));
    }
};


const createTaskTable = async (): Promise<void> => {
    try {
        const createQuery = `CREATE TABLE IF NOT EXISTS task
            (id SERIAL PRIMARY KEY, 
            name VARCHAR(100) NOT NULL,
            description VARCHAR(255),
            status_id INTEGER NOT NULL  REFERENCES status(id) ON DELETE CASCADE)`;
        const result = await pool.query(createQuery);
        console.log(chalk.green(result.command, '\n> Created the task table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not create the table: ', error));
    }
};

const createUserTaskTable = async (): Promise<void> => {
    try {
        const createQuery = `CREATE TABLE IF NOT EXISTS user_task
            (id SERIAL PRIMARY KEY, 
            proma_user_id INTEGER NOT NULL REFERENCES proma_user(id) ON DELETE CASCADE,
            task_id INTEGER NOT NULL REFERENCES task(id) ON DELETE CASCADE)`;
        const result = await pool.query(createQuery);
        console.log(chalk.green(result.command, '\n> Created the user_task table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not create the table: ', error));
    }
};

const createProjectTaskTable = async (): Promise<void> => {
    try {
        const createQuery = `CREATE TABLE IF NOT EXISTS project_task
            (id SERIAL PRIMARY KEY, 
            task_id INTEGER NOT NULL REFERENCES task(id) ON DELETE CASCADE,
            project_id INTEGER NOT NULL REFERENCES project(id) ON DELETE CASCADE)`;
        const result = await pool.query(createQuery);
        console.log(chalk.green(result.command, '\n> Created the project_task table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not create the table: ', error));
    }
};

const createUserProjectTable = async (): Promise<void> => {
    try {
        const createQuery = `CREATE TABLE IF NOT EXISTS user_project
            (id SERIAL PRIMARY KEY, 
            proma_user_id INTEGER NOT NULL REFERENCES proma_user(id) ON DELETE CASCADE,
            project_id INTEGER NOT NULL REFERENCES project(id) ON DELETE CASCADE,
            role_id INTEGER NOT NULL REFERENCES role(id) ON DELETE CASCADE)`;
        const result = await pool.query(createQuery);
        console.log(chalk.green(result.command, '\n> Created the user_project table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not create the table: ', error));
    }
};

const dropPromaUserTable = async (): Promise<void> => {
    try {
        const dropQuery = 'DROP TABLE IF EXISTS proma_user';
        const result = await pool.query(dropQuery);
        console.log(chalk.green(result.command, '\n> Dropped the proma_user table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not drop the table: ', error));
    }
};

const dropRoleTable = async (): Promise<void> => {
    try {
        const dropQuery = 'DROP TABLE IF EXISTS role';
        const result = await pool.query(dropQuery);
        console.log(chalk.green(result.command, '\n> Dropped the role table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not drop the table: ', error));
    }
};

const dropProjectTable = async (): Promise<void> => {
    try {
        const dropQuery = 'DROP TABLE IF EXISTS project';
        const result = await pool.query(dropQuery);
        console.log(chalk.green(result.command, '\n> Dropped the project table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not drop the table: ', error));
    }
};

const dropStatusTable = async (): Promise<void> => {
    try {
        const dropQuery = 'DROP TABLE IF EXISTS status';
        const result = await pool.query(dropQuery);
        console.log(chalk.green(result.command, '\n> Dropped the status table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not drop the table: ', error));
    }
};

const dropTaskTable = async (): Promise<void> => {
    try {
        const dropQuery = 'DROP TABLE IF EXISTS task';
        const result = await pool.query(dropQuery);
        console.log(chalk.green(result.command, '\n> Dropped the task table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not drop the table: ', error));
    }
};

const dropUserTaskTable = async (): Promise<void> => {
    try {
        const dropQuery = 'DROP TABLE IF EXISTS user_task';
        const result = await pool.query(dropQuery);
        console.log(chalk.green(result.command, '\n> Dropped the user_task table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not drop the table: ', error));
    }
};

const dropProjectTaskTable = async (): Promise<void> => {
    try {
        const dropQuery = 'DROP TABLE IF EXISTS project_task';
        const result = await pool.query(dropQuery);
        console.log(chalk.green(result.command, '\n> Dropped the project_task table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not drop the table: ', error));
    }
};

const dropUserProjectTable = async (): Promise<void> => {
    try {
        const dropQuery = 'DROP TABLE IF EXISTS user_project';
        const result = await pool.query(dropQuery);
        console.log(chalk.green(result.command, '\n> Dropped the user_project table.'));
    } catch (error) {
        console.trace(chalk.red('> Could not drop the table: ', error));
    }
};

export const createAllTables = async (): Promise<void> => {
    await createPromaUserTable();
    await createRoleTable();
    await createProjectTable();
    await createStatusTable();
    await createTaskTable();
    await createUserTaskTable();
    await createProjectTaskTable();
    await createUserProjectTable();
};

export const dropAllTables = async (): Promise<void> => {
    await dropUserProjectTable();
    await dropUserTaskTable();
    await dropProjectTaskTable();
    await dropPromaUserTable();
    await dropRoleTable();
    await dropProjectTable();
    await dropTaskTable();
    await dropStatusTable();
};

pool.on('remove', () => {
    console.log(chalk.yellow('> Client removed.'));
});
