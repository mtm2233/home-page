/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:50:09
 * @LastEditTime: 2021-04-14 23:01:41
 * @LastEditors: mTm
 */
const Router = require('koa-router');

const {
    list,
} = require('../controller/user.controller')

const {
    limit
} = require('../middleware/list.middleware')

const {
    verifyAuth
} = require('../middleware/auth.middleware')

const userRouter = new Router({prefix: '/user'});

userRouter.get('/list', verifyAuth, limit, list);

module.exports = userRouter;