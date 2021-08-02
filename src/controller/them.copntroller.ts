/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-16 21:48:21
 * @LastEditTime: 2021-08-03 00:16:15
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { ControllerTheme } from '../interface/class/theme.interface.class'

import themeService from '../service/theme.service'

class ThemeController implements ControllerTheme {
    async detail(ctx: Context, next: () => Promise<any>) {
        try {
            const { id } = ctx.user;
            const result = await themeService.detail(id)
            ctx.body = { 
                data: result,
                message: '获取预设成功',
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }

    async update(ctx: Context, next: () => Promise<any>) {
        try {
            const { id } = ctx.user;
            const theme = ctx.request.body
            await themeService.update(id, theme)
            ctx.body = {
                message: '保存预设成功',
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }
}

export default new ThemeController()