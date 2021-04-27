/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:24:37
 * @LastEditTime: 2021-04-27 23:06:59
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { WebsiteAdd, WebsiteList, WebsiteUpdate } from '../website.interface'

interface ControllerWebsite {
    create(ctx: Context, next: () => Promise<any>):Promise<any>;
    list(ctx: Context, next: () => Promise<any>):Promise<any>;
    detail(ctx: Context, next: () => Promise<any>):Promise<any>;
    update(ctx: Context, next: () => Promise<any>):Promise<any>;
    listByType(ctx: Context, next: () => Promise<any>):Promise<any>;
    listByTypeAll(ctx: Context, next: () => Promise<any>):Promise<any>;
}

interface ServiceWebsite {
    create(data: WebsiteAdd):Promise<any>;
    list(params: WebsiteList):Promise<any>;
    detail(websiteId: number):Promise<any>;
    update(websiteId: number, data: WebsiteUpdate):Promise<any>;
    listByType(pid: number, userId: number):Promise<any>;
    listByTypeAll(userId: number):Promise<any>;
    isExist(name: string, user_id: number): Promise<boolean>
}

export {
    ControllerWebsite,
    ServiceWebsite
}