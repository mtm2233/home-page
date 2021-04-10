/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:50:09
 * @LastEditTime: 2021-04-10 23:53:11
 * @LastEditors: mTm
 */
const Router = require('koa-router');

const userRouter = new Router({prefix: '/user'});

userRouter.get('/list', (ctx,next) => {
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
})

module.exports = userRouter;