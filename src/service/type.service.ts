/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 21:01:01
 * @LastEditTime: 2021-04-21 23:15:28
 * @LastEditors: mTm
 */
import connection from '../app/database'

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
            if (!pidInfo || pidInfo.pid) {
                return false;
            }
        }
        const statement = `
            INSERT INTO type (name, user_id, description, sort, pid) VALUES (?,?,?,?,?)
        `

        const [result] = await connection.execute(statement, [name, user_id, description, sort, pid]);

        return result;
    }

    async list (pid: number | null) {
        let statement = `
            SELECT id, name, description FROM type WHERE pid = ? ORDER BY sort ASC, createAt ASC;
        `
        if (!pid) {
            statement = `
            SELECT id, name, description FROM type WHERE pid IS NULL ORDER BY sort ASC, createAt ASC;
            `
        }

        const [result] = await connection.execute(statement, [pid]);

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

        const keys = ['name', 'user_id', 'description', 'sort', 'pid']

        if (pid) {
            const pidInfo: any = await this.detail(pid)
            if (!pidInfo) {
                return false;
            }
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
}

export default new TypeService();