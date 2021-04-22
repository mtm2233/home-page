/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 15:27:03
 * @LastEditTime: 2021-04-22 16:32:55
 * @LastEditors: mTm
 */
import connection from '../app/database'

import { ServiceUserWebsite } from '../interface/class/user-website.interface.class'

class UserWebsiteService implements ServiceUserWebsite {
    async update(userId: number, websiteIds: number[]) {
        await this.remove(userId);
        const promiseList = websiteIds.map(websiteId => this.create(userId, websiteId))
        const [result] = await Promise.all(promiseList);
        
        return result;
    }

    async remove(userId: number) {
        const statement = `
            DELETE FROM user_website WHERE user_id = ?;
        `;

        const [result] = await connection.execute(statement, [userId]);

        return result
    }

    async create(userId: number, websiteId: number) {
        const statement = `
            INSERT INTO user_website (user_id, website_id) VALUES (?, ?);
        `;

        const [result] = await connection.execute(statement, [userId, websiteId]);

        return result
    }

    async list(userId: number) {
        const statement = `
            SELECT JSON_ARRAYAGG(website_id) websiteIds FROM user_website WHERE user_id = ? GROUP BY user_id
        `;

        const [result] = await connection.execute(statement, [userId]);

        if (Array.isArray(result) && result.length) {
            return (result[0] as any).websiteIds
        }
        return []
    }
}

export default new UserWebsiteService()