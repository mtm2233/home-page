/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-13 23:11:32
 * @LastEditTime: 2021-04-18 23:04:34
 * @LastEditors: mTm
 */
import connection from '../app/database';

class UserService {
    async list(name: string, offset: string, size: string) {
        const statement = `
            SELECT * FROM coderhub.user WHERE username like '%${name}%' LIMIT ?, ?;
        `;
        const [result] = await connection.execute(statement, [offset, size]);
        return result;
    }
}

export default new UserService();