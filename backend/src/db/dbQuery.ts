import pool from './pool';

export default {
    query(queryText: string, values?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            pool.query(queryText, values)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};
