/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 21:01:01
 * @LastEditTime: 2021-04-21 21:41:24
 * @LastEditors: mTm
 */
import connection from '../app/database'

import { ServiceType } from '../interface/class/type.interface.class'
import { TypeAdd } from '../interface/type.interface'

class TypeService implements ServiceType {
    async create(params: TypeAdd) {
        const {
            name,
            user_id,
            description = null,
            sort = null,
            pid = null
        } = params;

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
}

export default new TypeService();