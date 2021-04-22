/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 16:13:52
 * @LastEditTime: 2021-04-22 22:24:42
 * @LastEditors: mTm
 */
import { Context } from 'koa'

interface ControllerUserSearch {
    list(ctx: Context, next: () => Promise<any>): Promise<any>;
    update(ctx: Context, next: () => Promise<any>): Promise<any>;
}

interface ServiceUserSearch {
    update(userId: number, searchIds: number[]): Promise<any>;
    remove(userId: number): Promise<any>;
    create(userId: number, searchId: number): Promise<any>;
    list(userId: number): Promise<any>;
}

export {
    ControllerUserSearch,
    ServiceUserSearch,
}