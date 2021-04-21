/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 17:02:09
 * @LastEditTime: 2021-04-21 21:32:08
 * @LastEditors: mTm
 */
import connection from '../app/database'

import { ServiceSearchEngine } from '../interface/class/searchEngine.interface.class'

class SearchEngineService implements ServiceSearchEngine {
    async list() {
        const statement = `
            SELECT id, name, website, search_key, icon, description, extra_key FROM search_engine WHERE is_show = '1';
        `;

        const [result] = await connection.execute(statement);

        return result;
    }

    async detail(id: number) {
        const statement = `
            SELECT * FROM search_engine WHERE is_show = '1' && id = ?;
        `;

        const [result] = await connection.execute(statement, [id]);

        if (Array.isArray(result) && result.length) {
            return result[0];
        }
        
        return false;
    }
}

export default new SearchEngineService()