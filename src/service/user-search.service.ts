/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 15:27:03
 * @LastEditTime: 2021-04-22 22:30:05
 * @LastEditors: mTm
 */
import connection from '../app/database'

import { ServiceUserSearch } from '../interface/class/user-search.interface.class'

class UserSearchService implements ServiceUserSearch {
    async update(userId: number, searchIds: number[]) {
        await this.remove(userId);
        const promiseList = searchIds.map(searchId => this.create(userId, searchId))
        const [result] = await Promise.all(promiseList);
        
        return result;
    }

    async remove(userId: number) {
        const statement = `
            DELETE FROM user_search WHERE user_id = ?;
        `;

        const [result] = await connection.execute(statement, [userId]);

        return result
    }

    async create(userId: number, searchId: number) {
        const statement = `
            INSERT INTO user_search (user_id, search_id) VALUES (?, ?);
        `;

        const [result] = await connection.execute(statement, [userId, searchId]);

        return result
    }

    async list(userId: number) {
        const statement = `
            SELECT JSON_ARRAYAGG(ut.search_id) searchIds FROM user_search ut WHERE user_id = ? GROUP BY ut.user_id
        `;

        const [result] = await connection.execute(statement, [userId]);

        if (Array.isArray(result) && result.length) {
            return (result[0] as any).searchIds
        }
        return []
    }
}

export default new UserSearchService()