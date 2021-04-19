/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-17 11:40:11
 * @LastEditTime: 2021-04-20 00:10:01
 * @LastEditors: mTm
 */
import * as path from 'path';
import * as fs from 'fs';
import { File as F } from 'koa-multer'
import { Context } from 'koa'
import { ControllerFile } from '../interface/class/file.interface.class'
import { FileCtx, ShowCtx, File } from '../interface/file.interface'

import service from '../service/file.service';

class FileController implements ControllerFile {
    async upload(ctx: FileCtx, next: () => Promise<any>) {
        try {
            let files = ctx.req.files;
            if (!(Array.isArray(files))) {
                ctx.body = {
                    message: '图片读取失败'
                }
                return false;
            }
            if (ctx.user) {
                files = files.map((file: F) => ({
                    ...file,
                    user_id: ctx.user.id
                }))
                const result = await Promise.all(files.map((file: File) => service.fileCreate(file)))
                if (result) {
                    ctx.body = {
                        message: '图片上传成功'
                    }
                }
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx)
        }
    }
    async show(ctx: Context, next: () => Promise<any>) {
        try {
            const { filename } = (ctx as ShowCtx).request.params;
            const { type } = ctx.query;

            const fileInfo: any = await service.getFileByFilename(filename);
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
        } catch (error) {
            ctx.app.emit('error', error, ctx)
        }
    }
}

export default new FileController();