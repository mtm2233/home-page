/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 21:01:01
 * @LastEditTime: 2021-04-28 00:01:23
 * @LastEditors: mTm
 */
import connection from '../app/database'
import { SYSTEM_USER_ID } from '../app/config'

import { ServiceType } from '../interface/class/type.interface.class'
import { TypeAdd } from '../interface/type.interface'

class TypeService implements ServiceType {
    async create(data: TypeAdd) {
        const {
            name,
            user_id,
            description = null,
            sort = null,
            pid = null
        } = data;

        if (pid) {
            const pidInfo: any = await this.detail(pid)
            if (!pidInfo) {
                throw new Error(`${pid} 不存在`)
                return false;
            } else if (pidInfo.pid) {
                throw new Error(`${pidInfo.pid} 只能为一级分类`)
            }
        }

        if (await this.isExist(name, user_id)) {
            throw new Error(`${name} 已存在`)
            return false;
        }
        
        const statement = `
            INSERT INTO type (name, user_id, description, sort, pid) VALUES (?,?,?,?,?)
        `

        const [result] = await connection.execute(statement, [name, user_id, description, sort, pid]);

        return result;
    }

    async list (pid: number | null, userId: number) {
        let statement = `
            SELECT id, name, description, IF(user_id = ?, TRUE, FALSE) is_edit FROM type WHERE pid = ? && user_id IN (${SYSTEM_USER_ID}, ?) ORDER BY sort ASC, createAt ASC;
        `
        if (!pid) {
            statement = `
            SELECT id, name, description, IF(user_id = ?, TRUE, FALSE) is_edit FROM type WHERE pid IS NULL && user_id IN (${SYSTEM_USER_ID}, ?) ORDER BY sort ASC, createAt ASC;
            `
        }

        const [result] = await connection.execute(statement, pid ? [userId, pid, userId] : [userId, userId]);

        return result;
    }

    async detail(id: number) {
        const statement = `
            SELECT * FROM type WHERE id = ?
        `
        
        const [result] = await connection.execute(statement, [id]);

        if (Array.isArray(result) && result.length) {
            return result[0];
        }
        
        return false;
    }

    async update(typeId: number, data: TypeAdd) {
        const {
            pid = null
        } = data;

        // 'user_id' 
        const keys = ['name', 'description', 'sort', 'pid']

        if (pid) {
            const pidInfo: any = await this.detail(pid)
            if (!pidInfo) {
                throw new Error(`${pid} 不存在`)
                return false;
            } else if (pidInfo.pid) {
                throw new Error(`${pidInfo.pid} 只能为一级分类`)
            }
        }

        if (data.name && data.user_id && await this.isExist(data.name, data.user_id, typeId)) {
            throw new Error(`${data.name} 已存在`)
            return false
        }

        const promiseList = Object.entries(data)
            .filter(([k, v]) => keys.includes(k))
            .map(([k, v]) => this.updateVal(k, v, typeId));
        const result = await Promise.all(promiseList)

        return result;
    }

    async updateVal(key: string, val: any, typeId: number) {
        const statement = `
            UPDATE type SET ${key} = ? WHERE id = ?;
        `
        
        const [result] = await connection.execute(statement, [val, typeId]);

        return result;
    }

    async isExist(name: string, user_id: number, id?: number) {
        let statement = `
            SELECT * From type WHERE name = ? && user_id = ?;
        `
        if (id) {
            statement = 'SELECT * From type WHERE name = ? && user_id = ? && id != ?'
        }
        const [result] = await connection.execute(statement, [name, user_id, id]);

        if (Array.isArray(result) && result.length) {
            return true;
        } {
            return false;
        }
    }
}

export default new TypeService();