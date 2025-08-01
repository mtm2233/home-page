/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 15:15:05
 * @LastEditTime: 2021-04-22 22:29:40
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { ControllerUserSearch } from '../interface/class/user-search.interface.class'

import service from '../service/user-search.service'

import { MISSING_PARAMETER } from '../constants/error-types'

class UserSearchController implements ControllerUserSearch {
    async list(ctx: Context, next: () => Promise<any>) {
        try {
            const { id } = ctx.user;
            const data = await service.list(id)
            ctx.body = {
                data,
                message: "获取隐藏的搜索引擎列表成功"
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx)
        }
    }

    async update(ctx: Context, next: () => Promise<any>) {
        try {
            const { id } = ctx.user;
            const { searchIds } = ctx.request.body as any;
            if (!(Array.isArray(searchIds))) {
                ctx.app.emit('error', new Error(MISSING_PARAMETER), ctx)
                return false;
            }
            await service.update(id, searchIds);
            ctx.body = {
                message: "搜索引擎隐藏成功"
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx)
        }
    }
}

export default new UserSearchController();