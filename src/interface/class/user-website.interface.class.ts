/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 16:13:52
 * @LastEditTime: 2021-04-22 16:27:38
 * @LastEditors: mTm
 */
import { Context } from 'koa'

interface ControllerUserWebsite {
    list(ctx: Context, next: () => Promise<any>): Promise<any>;
    update(ctx: Context, next: () => Promise<any>): Promise<any>;
}

interface ServiceUserWebsite {
    update(userId: number, typeIds: number[]): Promise<any>;
    remove(userId: number): Promise<any>;
    create(userId: number, typeId: number): Promise<any>;
    list(userId: number): Promise<any>;
}

export {
    ControllerUserWebsite,
    ServiceUserWebsite,
}