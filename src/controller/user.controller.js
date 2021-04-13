/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-13 22:55:27
 * @LastEditTime: 2021-04-13 22:56:44
 * @LastEditors: mTm
 */
class UserController {
    async list(ctx, next) {
        ctx.body = {
            message: '获取用户列表成功',
            data: [],
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