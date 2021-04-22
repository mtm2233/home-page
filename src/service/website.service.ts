/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:28:01
 * @LastEditTime: 2021-04-22 13:01:40
 * @LastEditors: mTm
 */
import connection from '../app/database'
import { ServiceWebsite } from '../interface/class/website.interface.class'
import { WebsiteAdd, WebsiteList } from '../interface/website.interface'

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

    async list(params: WebsiteList) {
        const {
            name,
            url,
            offset,
            size
        } = params;
        const statement = `
            SELECT name, url FROM website WHERE name LIKE '%${name}%' && url LIKE '%${url}%'
            ORDER BY sort ASC, createAt ASC
            LIMIT ?, ?;
        `;
        const [result] = await connection.execute(statement, [offset, size])

        return result;
    }

    async listByType(pid: number) {
        const statement = `
            SELECT t.id, t.name, t.description,
            IF(COUNT(w.id),
                JSON_ARRAYAGG(JSON_OBJECT('id', w.id, 'name', w.name, 'url', w.url, 'icon', w.icon, 'description', w.description, 'sort', w.sort)),
                NULL
            ) children
            FROM type t
            LEFT JOIN website w
            ON t.id = w.type_id
            WHERE t.pid = ?
            GROUP BY t.id
            ORDER BY t.sort ASC, t.createAt ASC, w.sort ASC, w.createAt ASC;
        `;

        const [result] = await connection.execute(statement, [pid])

        return result;
    }

    async detail(websiteId: number) {
        const statement = `
            SELECT * FROM website WHERE id = ?;
        `;
        const [result] = await connection.execute(statement, [websiteId])

        if (Array.isArray(result) && result.length) {
            return result[0];
        }
        
        return false;
    }

    async count(name: string, url: string) {
        const statement = `
            SELECT COUNT(*) count FROM website WHERE name LIKE '%${name}%' && url LIKE '%${url}%';
        `;
        const [result] = await connection.execute(statement)

        return Array.isArray(result) ? result[0] : {
            count: 0
        }
    }
}

export default new WebsiteService()