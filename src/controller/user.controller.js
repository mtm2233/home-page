/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-13 22:55:27
 * @LastEditTime: 2021-04-13 23:42:05
 * @LastEditors: mTm
 */
const service = require('../service/user.service')
class UserController {
    async list(ctx, next) {
        const { name = '', offset, size } = ctx.query;
        const result = await service.list(name, offset, size);
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
    }
}

module.exports = new UserController()