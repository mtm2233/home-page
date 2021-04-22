/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:28:01
 * @LastEditTime: 2021-04-22 10:58:43
 * @LastEditors: mTm
 */
import connection from '../app/database'
import { ServiceWebsite } from '../interface/class/website.interface.class'
import { WebsiteAdd } from '../interface/website.interface'

class WebsiteService implements ServiceWebsite {
    async create(data: WebsiteAdd) {
        const {
            name,
            url,
            icon = null,
            description = null,
            user_id,
            type_id = null,
            sort = null,
        } = data

        const statement = `
            INSERT INTO website (name, url, icon, description, user_id, type_id, sort) VALUES (?, ?, ?, ?, ?, ?, ?);
        `;

        const [result] = await connection.execute(statement, [name, url, icon, description, user_id, type_id, sort])

        return result;
    }
}

export default new WebsiteService()