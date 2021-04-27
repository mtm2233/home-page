/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 16:42:05
 * @LastEditTime: 2021-04-27 23:41:04
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { ControllerSearch } from '../interface/class/search.interface.class'

import service from '../service/search.service'

import { CONTENT_DOES_NOT_EXISTS, MISSING_PARAMETER, CONTENT_IS_EXIST, ERROR_PARAMETER } from '../constants/error-types'

class SearchController implements ControllerSearch {
    async list(ctx: Context, next: () => Promise<any>) {
        try {
            const userId = ctx.user.id;
            const result = await service.list(userId);
            ctx.body = {
                data: result,
                message: "获取搜索引擎列表成功"
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }

    async detail(ctx: Context, next: () => Promise<any>) {
        try {
            const { searchId } = ctx.params;
            const result = await service.detail(searchId);
            if (result) {
                ctx.body = {
                    data: result,
                    message: '获取搜索引擎信息成功'
                }
            } else {
                ctx.app.emit('error', new Error(CONTENT_DOES_NOT_EXISTS), ctx);
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }

    async create(ctx: Context, next: () => Promise<any>) {
        try {
            const userId = ctx.user.id;
            const { name, website, search_key } = ctx.request.body;
            if (!name || !website || !search_key) {
                ctx.app.emit('error', new Error(MISSING_PARAMETER), ctx);
                return false;
            }
            const result = await service.create(userId, ctx.request.body);
            if (!result) {
                ctx.app.emit('error', new Error(CONTENT_IS_EXIST), ctx);
                return false;
            }
            ctx.status = 201;
            ctx.body = {
                message: '搜索引擎添加成功'
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }

    async update(ctx: Context, next: () => Promise<any>) {
        try {
            const { searchId } = ctx.params;
            const result = await service.update(searchId, {
                ...ctx.request.body,
                user_id: ctx.user.id
            });
            if (!result) {
                ctx.app.emit('error', new Error(ERROR_PARAMETER), ctx);
                return false
            }
            ctx.body = {
                message: '搜索引擎编辑成功'
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }
}

export default new SearchController()