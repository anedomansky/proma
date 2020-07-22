import chalk from 'chalk';
import pool from './pool';

pool.on('connect', () => {
    console.log(chalk.blue('> Connected to database.'));
});

const createUserTable = (): void => {
    const createQuery = `CREATE TABLE IF NOT EXISTS user
    (id SERIAL PRIMARY KEY, 
    first_name VARCHAR(100), 
    last_name VARCHAR(100), 
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(100) NOT NULL,
    created_on DATE NOT NULL DEFAULT CURRENT_DATE)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Created the user table.'));
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table: ', error));
        });
};

const createRoleTable = (): void => {
    const createQuery = `CREATE TABLE IF NOT EXISTS role
    (id SERIAL PRIMARY KEY, 
    name VARCHAR(50) UNIQUE NOT NULL)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Created the role table.'));
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table: ', error));
        });
};

const createProjectTable = (): void => {
    const createQuery = `CREATE TABLE IF NOT EXISTS project
    (id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Created the project table.'));
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table: ', error));
        });
};

const createStatusTable = (): void => {
    const createQuery = `CREATE TABLE IF NOT EXISTS status
    (id SERIAL PRIMARY KEY, 
    name VARCHAR(50) UNIQUE NOT NULL)`;

    pool.query(createQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Created the status table.'));
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table: ', error));
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
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table: ', error));
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
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table: ', error));
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
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table: ', error));
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
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table: ', error));
        });
};

const dropUserTable = (): void => {
    const dropQuery = 'DROP TABLE IF EXISTS user';
    pool.query(dropQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Dropped the user table.'));
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not drop the table: ', error));
        });
};

const dropRoleTable = (): void => {
    const dropQuery = 'DROP TABLE IF EXISTS role';
    pool.query(dropQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Dropped the role table.'));
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not drop the table: ', error));
        });
};

const dropProjectTable = (): void => {
    const dropQuery = 'DROP TABLE IF EXISTS project';
    pool.query(dropQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Dropped the project table.'));
            pool.end();
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not drop the table: ', error));
            pool.end();
        });
};

const dropStatusTable = (): void => {
    const dropQuery = 'DROP TABLE IF EXISTS status';
    pool.query(dropQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Dropped the status table.'));
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not drop the table: ', error));
        });
};

const dropTaskTable = (): void => {
    const dropQuery = 'DROP TABLE IF EXISTS task';
    pool.query(dropQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Dropped the task table.'));
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not drop the table: ', error));
        });
};

const dropUserTaskTable = (): void => {
    const dropQuery = 'DROP TABLE IF EXISTS user_task';
    pool.query(dropQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Dropped the user_task table.'));
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not drop the table: ', error));
        });
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

const dropUserProjectTable = (): void => {
    const dropQuery = 'DROP TABLE IF EXISTS user_project';
    pool.query(dropQuery)
        .then((res) => {
            console.log(chalk.green(res.command, '\n> Dropped the user_project table.'));
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not drop the table: ', error));
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

export const dropAllTables = async (): Promise<void> => {
    dropUserTable();
    dropRoleTable();
    dropProjectTable();
    dropStatusTable();
    dropTaskTable();
    dropUserTaskTable();
    await dropProjectTaskTable();
    dropUserProjectTable();
};

pool.on('remove', () => {
    console.log(chalk.yellow('> Client removed.'));
    // process.exit(0);
});
