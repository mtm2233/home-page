/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:22:15
 * @LastEditTime: 2021-04-22 10:56:08
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { ControllerWebsite } from '../interface/class/website.interface.class'

import service from '../service/website.service'

import { MISSING_PARAMETER } from '../constants/error-types'

class WebsiteController implements ControllerWebsite {
    async create(ctx: Context, next: () => Promise<any>) {
        try {
            const { name, url } = ctx.request.body;
            if (!(name && url)) {
                ctx.app.emit('error', new Error(MISSING_PARAMETER), ctx);
                return false
            }
            await service.create({
                ...ctx.request.body,
                user_id: ctx.user.id,
            });
            ctx.status = 201;
            ctx.body = {
                message: '网址添加成功'
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }
}

export default new WebsiteController()