/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-17 12:31:18
 * @LastEditTime: 2021-04-17 13:03:44
 * @LastEditors: mTm
 */
const connection = require('../app/database')

class UserService {
    async fileCreate({
        filename,
        mimetype,
        size,
        path,
        originalname,
        encoding,
        user_id = null,
    }) {
        const statement = `
            INSERT INTO files (filename, mimetype, size, user_id, path, originalname, encoding) VALUES (?,?,?,?,?,?,?);
        `;
        const [result] = await connection.execute(statement, [filename, mimetype, size, user_id, path, originalname, encoding]);
        return result;
    }

    async getFileByFilename(filename) {
        const statement = `
            SELECT * FROM files WHERE filename = ?;
        `;
        const [[result]] = await connection.execute(statement, [filename]);
        return result;
    }
}

module.exports = new UserService()