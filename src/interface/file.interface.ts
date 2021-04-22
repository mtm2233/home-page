/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-19 09:18:53
 * @LastEditTime: 2021-04-22 10:36:25
 * @LastEditors: mTm
 */
import { File as F, MulterIncomingMessage } from 'koa-multer'
import { Context, Request } from 'koa'

interface File extends F {
    // filename: string;
    // mimetype: string;
    // size: number;
    // path: string;
    // originalname: string;
    // encoding: string;
    user_id: number;
}

// FileCtx
interface FileCtx extends Context {
    req: MulterIncomingMessage
}

export {
    File,
    FileCtx,
}