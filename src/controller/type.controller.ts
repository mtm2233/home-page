/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 20:39:18
 * @LastEditTime: 2021-04-21 21:38:53
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { ControllerType } from '../interface/class/type.interface.class'

import { MISSING_PARAMETER, ERROR_PARAMETER } from '../constants/error-types'

import service from '../service/type.service'

class TypeController implements ControllerType {
    async create(ctx: Context, next: () => Promise<any>) {
        try {
            const { name } = ctx.request.body;
            if(!name) {
                ctx.app.emit('error', new Error(MISSING_PARAMETER), ctx);
                return false;
            }
            const result = await service.create({
                ...ctx.request.body,
                user_id: ctx.user.id
            });
            if (!result) {
                ctx.app.emit('error', new Error(ERROR_PARAMETER), ctx);
                return false;
            }
            ctx.status = 201;
            ctx.body = {
                message: '添加分类成功'
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }
}

export default new TypeController()