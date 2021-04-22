/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 15:27:03
 * @LastEditTime: 2021-04-22 16:16:55
 * @LastEditors: mTm
 */
import connection from '../app/database'

import { ServiceUserType } from '../interface/class/user-type.interface.class'

class UserTypeService implements ServiceUserType {
    async update(userId: number, typeIds: number[]) {
        await this.remove(userId);
        const promiseList = typeIds.map(typeId => this.create(userId, typeId))
        const [result] = await Promise.all(promiseList);
        
        return result;
    }

    async remove(userId: number) {
        const statement = `
            DELETE FROM user_type WHERE user_id = ?;
        `;

        const [result] = await connection.execute(statement, [userId]);

        return result
    }

    async create(userId: number, typeId: number) {
        const statement = `
            INSERT INTO user_type (user_id, type_id) VALUES (?, ?);
        `;

        const [result] = await connection.execute(statement, [userId, typeId]);

        return result
    }

    async list(userId: number) {
        const statement = `
            SELECT JSON_ARRAYAGG(ut.type_id) typeIds FROM user_type ut WHERE user_id = ? GROUP BY ut.user_id
        `;

        const [result] = await connection.execute(statement, [userId]);

        if (Array.isArray(result) && result.length) {
            return (result[0] as any).typeIds
        }
        return []
    }
}

export default new UserTypeService()