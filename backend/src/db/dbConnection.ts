import chalk from 'chalk';
import pool from './pool';

pool.on('connect', () => {
    console.log(chalk.blue('> Connected to database.'));
});

pool.on('remove', () => {
    console.log(chalk.yellow('> Client removed.'));
});
