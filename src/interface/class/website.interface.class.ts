/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:24:37
 * @LastEditTime: 2021-04-22 10:24:38
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { WebsiteAdd } from '../website.interface'

interface ControllerWebsite {
    create(ctx: Context, next: () => Promise<any>):Promise<any>;
}

interface ServiceWebsite {
    create(data: WebsiteAdd):Promise<any>;
}

export {
    ControllerWebsite,
    ServiceWebsite
}