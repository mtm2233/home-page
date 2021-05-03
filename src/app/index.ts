/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:33:31
 * @LastEditTime: 2021-05-03 22:03:05
 * @LastEditors: mTm
 */
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as errorHandler from './error-handler';

import { Context } from 'koa'

import useRoutes from '../router';
const app = new Koa();
app.use(bodyParser())

// 处理跨域
/* 跨域设置 */
app.use(async (ctx: Context, next: () => Promise<any>) => {
    ctx.set("Access-Control-Allow-Origin", "*"); //访问控制允许来源：*为所有
    ctx.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild"
    ); //访问控制允许报头Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild
    ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS"); //访问控制允许方法
    ctx.set("X-Powered-By", "nodejs"); //自定义头信息，表示服务端用nodejs
    if (ctx.method == "OPTIONS") {
      ctx.body = 200; //OPTIONS类型的请求直接返回200
    } else {
      await next();
    }
  });

useRoutes(app);

app.on('error', errorHandler as any)

module.exports = app