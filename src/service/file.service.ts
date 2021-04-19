/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-17 12:31:18
 * @LastEditTime: 2021-04-19 09:17:56
 * @LastEditors: mTm
 */
import connection from '../app/database';

import { File } from '../interface/file.interface'
import { ServiceFile } from '../interface/class/file.interface.class';

class FileService implements ServiceFile {
    async fileCreate(file: File) {
        const {
            filename,
            mimetype,
            size,
            path,
            originalname,
            encoding,
            user_id = null,
        } = file;
        const statement = `
            INSERT INTO files (filename, mimetype, size, user_id, path, originalname, encoding) VALUES (?,?,?,?,?,?,?);
        `;
        const [result] = await connection.execute(statement, [filename, mimetype, size, user_id, path, originalname, encoding]);
        return result;
    }

    async getFileByFilename(filename: string) {
        const statement = `
            SELECT * FROM files WHERE filename = ?;
        `;
        const [result] = await connection.execute(statement, [filename]);
        return [result];
    }
}

export default new FileService();