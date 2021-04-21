/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 20:50:45
 * @LastEditTime: 2021-04-21 21:22:50
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { TypeAdd } from '../type.interface'

interface ControllerType {
    create(ctx: Context, next: () => Promise<any>):Promise<any>;
    // list(ctx: Context, next: () => Promise<any>):Promise<any>;
    // detail(ctx: Context, next: () => Promise<any>):Promise<any>;
}

interface ServiceType {
    create(params: TypeAdd):Promise<any>;
}

export {
    ControllerType,
    ServiceType
}