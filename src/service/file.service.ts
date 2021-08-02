/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-17 12:31:18
 * @LastEditTime: 2021-08-03 00:02:00
 * @LastEditors: mTm
 */
import connection from '../app/database';

class FileService implements File.ServiceFile {
    async fileCreate(file: File.File) {
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