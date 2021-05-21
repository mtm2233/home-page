/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:22:15
 * @LastEditTime: 2021-05-21 11:20:19
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { ControllerWebsite } from '../interface/class/website.interface.class'

import service from '../service/website.service'

import { MISSING_PARAMETER, CONTENT_IS_EXIST, ERROR_PARAMETER } from '../constants/error-types'
import { sortResult } from '../units/sort'

class WebsiteController implements ControllerWebsite {
    async create(ctx: Context, next: () => Promise<any>) {
        try {
            const { name, url } = ctx.request.body;
            if (!(name && url)) {
                ctx.app.emit('error', new Error(MISSING_PARAMETER), ctx);
                return false
            }
            const result = await service.create({
                ...ctx.request.body,
                user_id: ctx.user.id,
            });
            if (!result) {
                ctx.app.emit('error', new Error(CONTENT_IS_EXIST), ctx);
                return false;
            }

            ctx.status = 201;
            ctx.body = {
                message: '网址添加成功'
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }

    async list(ctx: Context, next: () => Promise<any>) {
        try {
            const { name = '', url = '', offset, size } = (ctx.query as any);
            const user_id = ctx.user.id;
            const data = await service.list({
                name,
                url,
                offset,
                size,
                user_id,
            });
            const { count } = (await service.count(name, url) as any)
            ctx.body = {
                data: sortResult(data),
                message: '获取网址列表成功',
                meta: {
                    ...ctx.meta,
                    count,
                    maxPage: Math.ceil(count/size),
                }
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }

    async listByTypeAll(ctx: Context, next: () => Promise<any>) {
        try {
            const userId = ctx.user.id;
            const data = await service.listByTypeAll(userId);
            ctx.body = {
                data: sortResult(data),
                message: '根据分类获取所以网址列表成功'
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }

    async listByType(ctx: Context, next: () => Promise<any>) {
        try {
            const { typeId } = ctx.params;
            const userId = ctx.user.id;
            const data = await service.listByType(typeId, userId);
            ctx.body = {
                data: sortResult(data),
                message: '根据分类获取网址列表成功'
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }

    async detail(ctx: Context, next: () => Promise<any>) {
        try {
            const { websiteId } = ctx.params; 
            const data = await service.detail(websiteId);
            ctx.body = {
                data,
                message: '获取网址详情成功'
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }

    async update(ctx: Context, next: () => Promise<any>) {
        try {
            const { websiteId } = ctx.params;
            const result = await service.update(websiteId, {
                ...ctx.request.body,
                user_id: ctx.user.id
            })
            if (!result) {
                ctx.app.emit('error', new Error(ERROR_PARAMETER), ctx);
                return false
            }
            ctx.body = {
                message: '网址编辑成功'
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }

    async remove(ctx: Context, next: () => Promise<any>) {
        try {
            const { websiteId } = ctx.params;
            const result: any = await service.remove(websiteId)
            if (Array.isArray(result) && result.length) {
                throw new Error('删除失败')
                return false
            }
            ctx.body = {
                message: '网址删除成功'
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }
}

export default new WebsiteController()