import pool from './pool';
import chalk from 'chalk';

pool.on('connect', () => {
    console.log(chalk.green('> Connected to database.'));
});

/**
 * Create User Table
 * CREATE TABLE test
    (id SERIAL PRIMARY KEY, 
    name VARCHAR(100) UNIQUE NOT NULL, 
    phone VARCHAR(100));
 */
const createUserTable = (): void => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
    (id SERIAL PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    first_name VARCHAR(100), 
    last_name VARCHAR(100), 
    password VARCHAR(100) NOT NULL,
    created_on DATE NOT NULL)`;

    pool.query(userCreateQuery)
        .then((res) => {
            console.log(chalk.green('> Created the table.', res.command));
            pool.end();
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not create the table.', error));
            pool.end();
        });
};

/**
 * Drop User Table
 */
const dropUserTable = (): void => {
    const usersDropQuery = 'DROP TABLE IF EXISTS users';
    pool.query(usersDropQuery)
        .then((res) => {
            console.log(chalk.green('> Dropped the table.', res.command));
            pool.end();
        })
        .catch((error) => {
            console.trace(chalk.red('> Could not drop the table.', error));
            pool.end();
        });
};

/**
 * Create All Tables
 */
export const createAllTables = (): void => {
    createUserTable();
};

/**
 * Drop All Tables
 */
export const dropAllTables = (): void => {
    dropUserTable();
};

pool.on('remove', () => {
    console.log(chalk.yellow('> Client removed.'));
    // process.exit(0);
});
