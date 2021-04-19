/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-13 23:11:32
 * @LastEditTime: 2021-04-19 09:50:50
 * @LastEditors: mTm
 */
import connection from '../app/database';

import { ServiceUser } from '../interface/class/user.interface.class';

class UserService implements ServiceUser {
    async list(name: string, offset: string, size: string) {
        const statement = `
            SELECT * FROM coderhub.user WHERE username like '%${name}%' LIMIT ?, ?;
        `;
        const [result] = await connection.execute(statement, [offset, size]);
        return result;
    }
}

export default new UserService();