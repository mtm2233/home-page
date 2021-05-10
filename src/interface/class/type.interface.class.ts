/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 20:50:45
 * @LastEditTime: 2021-05-10 23:23:57
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { TypeAdd } from '../type.interface'

interface ControllerType {
    create(ctx: Context, next: () => Promise<any>):Promise<any>;
    list(ctx: Context, next: () => Promise<any>):Promise<any>;
    detail(ctx: Context, next: () => Promise<any>):Promise<any>;
    update(ctx: Context, next: () => Promise<any>):Promise<any>;
    remove(ctx: Context, next: () => Promise<any>):Promise<any>;
    listTree(ctx: Context, next: () => Promise<any>):Promise<any>;
}

interface ServiceType {
    create(data: TypeAdd):Promise<any>;
    list(pid: number | null, userId: number):Promise<any>;
    detail(id: number):Promise<any>;
    update(typeId: number, data: TypeAdd):Promise<any>;
    updateVal(key: string, val: any, typeId: number):Promise<any>;
    isExist(name: string, user_id: number, id?: number): Promise<boolean>;
    remove(typeId: number):Promise<any>;
    listTree(userId: number):Promise<any>;
}

export {
    ControllerType,
    ServiceType
}