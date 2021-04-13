/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:50:09
 * @LastEditTime: 2021-04-13 22:58:22
 * @LastEditors: mTm
 */
const Router = require('koa-router');

const {
    list,
} = require('../controller/user.controller')

const userRouter = new Router({prefix: '/user'});

userRouter.get('/list', list);

module.exports = userRouter;