/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-08-02 23:34:22
 * @LastEditTime: 2021-08-03 00:02:24
 * @LastEditors: mTm
 */
import { File as F, MulterIncomingMessage } from "koa-multer";
import { Context, Request } from "koa";

declare global {
  namespace File {
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
      req: MulterIncomingMessage;
    }
    interface ServiceFile {
        fileCreate(file: File): any;
        getFileByFilename(filename: string): any;
    }
    interface ControllerFile {
        upload(ctx: FileCtx, next: () => Promise<any>): Promise<any>;
        show(ctx: Context, next: () => Promise<any>): Promise<any>;
    }
  }
}