/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 11:05:45
 * @LastEditTime: 2021-04-22 11:11:03
 * @LastEditors: mTm
 */

import { Context } from 'koa'

import typeService from '../service/type.service'

import { ERROR_PARAMETER } from '../constants/error-types'

const verifyTypeId = async (ctx: Context, next: () => Promise<any>) => {
    try {
        const { type_id } = ctx.request.body
        if (type_id) {
            const result: any = await typeService.detail(type_id);
            if (!result || !(result.pid)) {
                ctx.app.emit('error', new Error(ERROR_PARAMETER), ctx);
                return false
            }
        }
        await next();
    } catch (error) {
        ctx.app.emit('error', error, ctx)
    }
}

export {
    verifyTypeId
}