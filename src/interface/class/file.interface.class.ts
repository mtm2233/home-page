/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-19 09:24:33
 * @LastEditTime: 2021-04-21 22:39:25
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { File, FileCtx } from '../file.interface'

interface ServiceFile {
    fileCreate(file: File): any;
    getFileByFilename(filename: string): any;
}

interface ControllerFile {
    upload(ctx: FileCtx, next: () => Promise<any>): Promise<any>;
    show(ctx: Context, next: () => Promise<any>): Promise<any>;
}

export {
    ServiceFile,
    ControllerFile
}