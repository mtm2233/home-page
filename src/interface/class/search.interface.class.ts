/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 16:59:43
 * @LastEditTime: 2021-04-22 20:19:30
 * @LastEditors: mTm
 */
import { Context } from 'koa'

import { SearchAdd, SearchEdit } from '../search.interface'
interface ControllerSearch {
    list(ctx: Context, next: () => Promise<any>): Promise<any>;
    detail(ctx: Context, next: () => Promise<any>): Promise<any>;
    create(ctx: Context, next: () => Promise<any>): Promise<any>;
    update(ctx: Context, next: () => Promise<any>): Promise<any>;
}

interface ServiceSearch {
    list(userId: number): Promise<any>;
    detail(searchId: number): Promise<any>;
    create(userId: number, data: SearchAdd): Promise<any>;
    update(searchId: number, data: SearchEdit): Promise<any>;
    updateVal(key: string, val: any, searchId: number): Promise<any>;
}

export {
    ControllerSearch,
    ServiceSearch
}