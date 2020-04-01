import pool from './pool';

export default {
    /**
     * DB Query
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    query(queryText: string, params: any): Promise<object> {
        return new Promise((resolve, reject) => {
            pool.query(queryText, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};
