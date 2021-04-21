/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 20:50:45
 * @LastEditTime: 2021-04-21 22:22:38
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { TypeAdd } from '../type.interface'

interface ControllerType {
    create(ctx: Context, next: () => Promise<any>):Promise<any>;
    list(ctx: Context, next: () => Promise<any>):Promise<any>;
    // detail(ctx: Context, next: () => Promise<any>):Promise<any>;
}

interface ServiceType {
    create(params: TypeAdd):Promise<any>;
    list(pid: number | null):Promise<any>;
    detail(id: number):Promise<any>;
}

export {
    ControllerType,
    ServiceType
}