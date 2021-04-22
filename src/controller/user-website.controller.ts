/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 15:15:05
 * @LastEditTime: 2021-04-22 16:39:53
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { ControllerUserWebsite } from '../interface/class/user-website.interface.class'

import service from '../service/user-website.service'

import { MISSING_PARAMETER } from '../constants/error-types'

class UserWebsiteController implements ControllerUserWebsite {
    async list(ctx: Context, next: () => Promise<any>) {
        try {
            const { id } = ctx.user;
            const data = await service.list(id)
            ctx.body = {
                data,
                message: "获取隐藏的网页列表成功"
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx)
        }
    }

    async update(ctx: Context, next: () => Promise<any>) {
        try {
            const { id } = ctx.user;
            const { websiteIds } = ctx.request.body;
            if (!(Array.isArray(websiteIds))) {
                ctx.app.emit('error', new Error(MISSING_PARAMETER), ctx)
                return false;
            }
            await service.update(id, websiteIds);
            ctx.body = {
                message: "网页隐藏成功"
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx)
        }
    }
}

export default new UserWebsiteController();