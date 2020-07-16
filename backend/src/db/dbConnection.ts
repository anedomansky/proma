import chalk from 'chalk';
import pool from './pool';

pool.on('connect', () => {
    console.log(chalk.green('> Connected to database.'));
});

const createUserTable = (): void => {
    const createQuery = `CREATE TABLE IF NOT EXISTS user
    (id SERIAL PRIMARY KEY, 
    first_name VARCHAR(100), 
    last_name VARCHAR(100), 
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(100) NOT NULL,
    created_on DATE NOT NULL)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Created the user table.'));
            pool.end();
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table.', error));
            pool.end();
        });
};

const createRoleTable = (): void => {
    const createQuery = `CREATE TABLE IF NOT EXISTS role
    (id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Created the role table.'));
            pool.end();
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table.', error));
            pool.end();
        });
};

const createProjectTable = (): void => {
    const createQuery = `CREATE TABLE IF NOT EXISTS project
    (id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Created the project table.'));
            pool.end();
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table.', error));
            pool.end();
        });
};

const createStatusTable = (): void => {
    const createQuery = `CREATE TABLE IF NOT EXISTS status
    (id SERIAL PRIMARY KEY, 
    name VARCHAR(50) UNIQUE NOT NULL)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Created the status table.'));
            pool.end();
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table.', error));
            pool.end();
        });
};

const createTaskTable = (): void => {
    const createQuery = `CREATE TABLE IF NOT EXISTS task
    (id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    status_id INTEGER REFERENCES status(id) ON DELETE CASCADE)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Created the task table.'));
            pool.end();
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table.', error));
            pool.end();
        });
};

const createUserTaskTable = (): void => {
    const createQuery = `CREATE TABLE IF NOT EXISTS user_task
    (id SERIAL PRIMARY KEY, 
    user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
    task_id INTEGER REFERENCES task(id) ON DELETE CASCADE)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Created the user_task table.'));
            pool.end();
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table.', error));
            pool.end();
        });
};

const createProjectTaskTable = (): void => {
    const createQuery = `CREATE TABLE IF NOT EXISTS project_task
    (id SERIAL PRIMARY KEY, 
    task_id INTEGER REFERENCES task(id) ON DELETE CASCADE,
    project_id INTEGER REFERENCES project(id) ON DELETE CASCADE)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Created the project_task table.'));
            pool.end();
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table.', error));
            pool.end();
        });
};

const createUserProjectTable = (): void => {
    const createQuery = `CREATE TABLE IF NOT EXISTS user_project
    (id SERIAL PRIMARY KEY, 
    user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
    project_id INTEGER REFERENCES project(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES role(id) ON DELETE CASCADE)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Created the user_project table.'));
            pool.end();
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table.', error));
            pool.end();
        });
};

const dropUserTable = (): void => {
    const dropQuery = 'DROP TABLE IF EXISTS users';
    pool.query(dropQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Dropped the user table.'));
            pool.end();
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not drop the table.', error));
            pool.end();
        });
};

export const createAllTables = (): void => {
    createUserTable();
    createRoleTable();
    createProjectTable();
    createStatusTable();
    createTaskTable();
    createUserTaskTable();
    createProjectTaskTable();
    createUserProjectTable();
};

export const dropAllTables = (): void => {
    dropUserTable();
};

pool.on('remove', () => {
    console.log(chalk.yellow('> Client removed.'));
    // process.exit(0);
});
