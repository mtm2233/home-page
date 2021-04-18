/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-17 11:40:11
 * @LastEditTime: 2021-04-18 23:01:29
 * @LastEditors: mTm
 */
import * as path from 'path';
import * as fs from 'fs';
import { BaseContext } from 'koa';

const service = require('../service/file.service')

class FileController {
    async upload(ctx:any, next:Promise<any>) {
        let files = ctx.req.files;
        if (ctx.user) {
            files.map((file:Object) => ({
                ...file,
                user_id: ctx.user.id
            }))
        }
        const result = await Promise.all(files.map((file:Object) => service.fileCreate(file)))
        if (result) {
            ctx.body = {
                message: '图片上传成功'
            }
        }
    }
    async show(ctx:any, next:Promise<any>) {
        const { filename } = ctx.request.params;
        const { type } = ctx.query;

        const fileInfo = await service.getFileByFilename(filename);
        if (!fileInfo) {
            ctx.body = {
                message: '文件不存在'
            }
            return false;
        }

        // 文件后缀
        const extname = path.extname(filename)
        // 拼接type
        const filePath = fileInfo.path.replace(extname, '');
        const filepathAddType = `${filePath}-${type}${extname}`;
        // 设置返回类型
        ctx.response.set('content-type', fileInfo.mimetype);
        // 判断文件是否存在
        if (fs.existsSync(filepathAddType)) {
            ctx.body = fs.createReadStream(filepathAddType);
        } else if (fs.existsSync(fileInfo.path)) {
            ctx.body = fs.createReadStream(fileInfo.path);
        } else {
            ctx.body = {
                message: '文件不存在'
            }
            return false;
        }
    }
}

export default new FileController();