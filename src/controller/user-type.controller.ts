/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 15:15:05
 * @LastEditTime: 2021-04-22 15:52:28
 * @LastEditors: mTm
 */
import { Context } from 'koa'

import service from '../service/user-type.service'

import { MISSING_PARAMETER } from '../constants/error-types'

class UserTypeController {
    async list(ctx: Context, next: () => Promise<any>) {
        try {
            const { id } = ctx.user;
            const data = await service.list(id)
            ctx.body = {
                data,
                message: "获取隐藏的分类列表成功"
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx)
        }
    }

    async update(ctx: Context, next: () => Promise<any>) {
        try {
            const { id } = ctx.user;
            const { typeIds } = ctx.request.body;
            if (!(Array.isArray(typeIds))) {
                ctx.app.emit('error', new Error(MISSING_PARAMETER), ctx)
                return false;
            }
            await service.update(id, typeIds);
            ctx.body = {
                message: "分类隐藏成功"
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx)
        }
    }
}

export default new UserTypeController();