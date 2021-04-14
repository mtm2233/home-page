/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-13 22:55:27
 * @LastEditTime: 2021-04-14 22:50:40
 * @LastEditors: mTm
 */
const service = require('../service/user.service')
class UserController {
    async list(ctx, next) {
        const { name = '', offset, size } = ctx.query;
        try {
            const result = await service.list(name, offset, size, ctx);
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

module.exports = new UserController()