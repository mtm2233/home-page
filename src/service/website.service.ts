/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:28:01
 * @LastEditTime: 2021-04-22 20:41:58
 * @LastEditors: mTm
 */
import connection from '../app/database'

import { ServiceWebsite } from '../interface/class/website.interface.class'
import { WebsiteAdd, WebsiteList, WebsiteUpdate } from '../interface/website.interface'

import { SYSTEM_USER_ID } from '../app/config'

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
            size,
            user_id
        } = params;
        const statement = `
            SELECT name, url, IF(user_id = ?, TRUE, FALSE) is_edit FROM website WHERE name LIKE '%${name}%' && url LIKE '%${url}%' && user_id in (${SYSTEM_USER_ID}, ?)
            ORDER BY sort ASC, createAt ASC
            LIMIT ?, ?;
        `;
        const [result] = await connection.execute(statement, [user_id, user_id, offset, size])

        return result;
    }

    async listByType(pid: number, userId: number) {
        const statement = `
            SELECT t.id, t.name, t.description,
            IF(t.user_id = ?, TRUE, FALSE) is_edit,
            IF(COUNT(w.id),
                JSON_ARRAYAGG(JSON_OBJECT('id', w.id, 'name', w.name, 'url', w.url, 'icon', w.icon, 'description', w.description, 'sort', w.sort, 'is_edit', IF(w.user_id = ?, TRUE, FALSE))),
                NULL
            ) children
            FROM type t
            LEFT JOIN website w
            ON t.id = w.type_id
            WHERE t.pid = ? && t.user_id in (${SYSTEM_USER_ID}, ?) && w.user_id in (${SYSTEM_USER_ID}, ?)
            GROUP BY t.id
            ORDER BY t.sort ASC, t.createAt ASC, w.sort ASC, w.createAt ASC;
        `;

        const [result] = await connection.execute(statement, [userId, userId, pid, userId, userId])

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
    async update(websiteId: number, data: WebsiteUpdate) {
        const keys = ['name', 'url', 'icon', 'description', 'user_id', 'type_id', 'sort']

        const promiseList = Object.entries(data)
            .filter(([k]) => keys.includes(k))
            .map(([k, v]) => this.updateVal(k, v, websiteId));
        const result = await Promise.all(promiseList)

        return result;
    }

    async updateVal(key: string, val: any, websiteId: number) {
        const statement = `
            UPDATE website SET ${key} = ? WHERE id = ?;
        `
        
        const [result] = await connection.execute(statement, [val, websiteId]);

        return result;
    }
}

export default new WebsiteService()