/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-13 22:55:27
 * @LastEditTime: 2021-04-20 00:10:16
 * @LastEditors: mTm
 */
import { Context } from 'koa';
import service from '../service/user.service';

import { ControllerUser } from '../interface/class/user.interface.class'
class UserController implements ControllerUser {
    async list(ctx: Context, next: () => Promise<any>) {
        try {
            const { name = '', offset, size } = ctx.query;
            const result = await service.list(name as string, offset as string, size as string);
            ctx.body = {
                message: '获取用户列表成功',
                data: result,
                meta: {
                    total: 0,
                    page: 1,
                    pageSize: 10,
                    maxPage: 1,
                }
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }
}

export default new UserController();