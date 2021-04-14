/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-02 17:06:10
 * @LastEditTime: 2021-04-14 23:14:12
 * @LastEditors: mTm
 */
const connection = require('../app/database')

class AuthService {
    async isExists(tableName, id) {
        const statement = `SELECT * FROM ${tableName} WHERE id = ?;`;
        const [result] = await connection.execute(statement, [id]);
        return result.length === 0 ? false : true;
    }

    async authPermission(tableName, id, userId) {
        const statement = `SELECT * FROM ${tableName} WHERE id = ? && user_id = ?;`;
        const [result] = await connection.execute(statement, [id, userId]);
        return result.length === 0 ? false : true;
    }
}

module.exports = new AuthService();