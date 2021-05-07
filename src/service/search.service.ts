/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 17:02:09
 * @LastEditTime: 2021-05-07 23:22:16
 * @LastEditors: mTm
 */
import connection from '../app/database'

import { SYSTEM_USER_ID } from '../app/config'

import { ServiceSearch } from '../interface/class/search.interface.class'
import { SearchAdd, SearchEdit } from '../interface/search.interface'

class SearchService implements ServiceSearch {
    async list(userId: number) {
        const statement = `
            SELECT id, name, website, search_key, icon, description, extra_key, placeholder,
                IF(user_id = ?, TRUE, FALSE) is_edit
                FROM search WHERE user_id in (${SYSTEM_USER_ID}, ?)
                ORDER BY sort ASC, createAt ASC;
        `;

        const [result] = await connection.execute(statement, [userId, userId]);

        return result;
    }

    async detail(searchId: number) {
        const statement = `
            SELECT * FROM search WHERE id = ?;
        `;

        const [result] = await connection.execute(statement, [searchId]);

        if (Array.isArray(result) && result.length) {
            return result[0];
        }
        
        return false;
    }

    async create(userId: number, data: SearchAdd) {
        const {
            name,
            website,
            search_key,
            icon = null,
            description = null,
            extra_key = null,
            placeholder = null,
        } = data;

        if (await this.isExist(name, userId)) {
            throw new Error(`${name} 已存在`)
            return false;
        }

        const statement = `
            INSERT INTO search 
                (name, website, search_key, icon, description, user_id, extra_key, placeholder) 
                VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const [result] = await connection.execute(statement, [name, website, search_key, icon, description, userId, extra_key, placeholder]);
        
        return result;
    }

    async update(searchId: number, data: SearchEdit) {
        // 'user_id', 
        const keys = ['name', 'website', 'search_key', 'icon', 'description', 'extra_key', 'placeholder']

        if (data.name && data.user_id && await this.isExist(data.name, data.user_id, searchId)) {
            throw new Error(`${data.name} 已存在`)
            return false
        }

        const promiseList = Object.entries(data)
            .filter(([k]) => keys.includes(k))
            .map(([k, v]) => this.updateVal(k, v, searchId));
        const result = await Promise.all(promiseList)

        return result;
    }

    async updateVal(key: string, val: any, searchId: number){
        const statement = `
            UPDATE search SET ${key} = ? WHERE id = ?;
        `
        
        const [result] = await connection.execute(statement, [val, searchId]);

        return result;
    }

    async isExist(name: string, user_id: number, id?: number) {
        let statement = `
            SELECT * From search WHERE name = ? && user_id = ?;
        `
        if (id) {
            statement = 'SELECT * From search WHERE name = ? && user_id = ? && id != ?'
        }
        const [result] = await connection.execute(statement, id ? [name, user_id, id] : [name, user_id]);

        if (Array.isArray(result) && result.length) {
            return true;
        } {
            return false;
        }
    }
}

export default new SearchService()