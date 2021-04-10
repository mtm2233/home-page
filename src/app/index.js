/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:33:31
 * @LastEditTime: 2021-04-10 23:54:00
 * @LastEditors: mTm
 */
const Koa = require('koa')

const userRouter = require('../router/user.router')

const app = new Koa();

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

module.exports = app