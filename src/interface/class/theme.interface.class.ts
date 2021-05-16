/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-16 21:51:31
 * @LastEditTime: 2021-05-16 22:42:31
 * @LastEditors: mTm
 */
import { Context } from 'koa'

import { Theme } from '../theme.interface'

interface ControllerTheme {
    detail(ctx: Context, next: () => Promise<any>): Promise<any>;
    update(ctx: Context, next: () => Promise<any>): Promise<any>;
}


interface ServiceTheme {
    detail(userId: number): Promise<any>;
    update(userId: number, data: Theme): Promise<any>;
    isExist(userId: number): Promise<Boolean>;
}

export {
    ControllerTheme,
    ServiceTheme,
}