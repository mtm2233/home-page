/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:33:31
 * @LastEditTime: 2021-04-18 23:42:48
 * @LastEditors: mTm
 */
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as errorHandler from './error-handler';

// import userRouter from '../router/user.router'

import useRoutes from '../router';
const app = new Koa();

app.use(bodyParser())
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
useRoutes(app);

app.on('error', errorHandler as any)

module.exports = app