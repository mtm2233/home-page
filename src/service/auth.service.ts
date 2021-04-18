/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-02 17:06:10
 * @LastEditTime: 2021-04-18 23:13:36
 * @LastEditors: mTm
 */
import connection from '../app/database';

class AuthService {
    async isExists(tableName: string, id: number) {
        const statement = `SELECT * FROM ${tableName} WHERE id = ?;`;
        const [result] = await connection.execute(statement, [id]);
        return (result as []).length === 0 ? false : true;
    }

    async authPermission(tableName: string, id: number, userId: number) {
        const statement = `SELECT * FROM ${tableName} WHERE id = ? && user_id = ?;`;
        const [result] = await connection.execute(statement, [id, userId]);
        return (result as []).length === 0 ? false : true;
    }
}

export default new AuthService();