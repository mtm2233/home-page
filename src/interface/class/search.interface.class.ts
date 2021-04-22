/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 16:59:43
 * @LastEditTime: 2021-04-21 21:20:34
 * @LastEditors: mTm
 */
import { Context } from 'koa'

interface ControllerSearch {
    list(ctx: Context, next: () => Promise<any>): Promise<any>;
    detail(ctx: Context, next: () => Promise<any>): Promise<any>;
}

interface ServiceSearch {
    list(): Promise<any>;
    detail(id: number): Promise<any>;
}

export {
    ControllerSearch,
    ServiceSearch
}