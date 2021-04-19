/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-19 09:24:33
 * @LastEditTime: 2021-04-19 12:54:47
 * @LastEditors: mTm
 */
import { File, FileCtx, ShowCtx } from '../file.interface'

interface ServiceFile {
    fileCreate(file: File): any;
    getFileByFilename(filename: string): any;
}

interface ControllerFile {
    upload(ctx: FileCtx, next: () => Promise<any>): Promise<any>;
    show(ctx: ShowCtx, next: () => Promise<any>): Promise<any>;
}

export {
    ServiceFile,
    ControllerFile
}