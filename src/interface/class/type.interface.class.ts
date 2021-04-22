/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 20:50:45
 * @LastEditTime: 2021-04-22 16:47:15
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { TypeAdd } from '../type.interface'

interface ControllerType {
    create(ctx: Context, next: () => Promise<any>):Promise<any>;
    list(ctx: Context, next: () => Promise<any>):Promise<any>;
    detail(ctx: Context, next: () => Promise<any>):Promise<any>;
    update(ctx: Context, next: () => Promise<any>):Promise<any>;
}

interface ServiceType {
    create(data: TypeAdd):Promise<any>;
    list(pid: number | null, userId: number):Promise<any>;
    detail(id: number):Promise<any>;
    update(typeId: number, data: TypeAdd):Promise<any>;
    updateVal(key: string, val: any, typeId: number):Promise<any>;
}

export {
    ControllerType,
    ServiceType
}