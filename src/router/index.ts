/*
 * @Description: 自动化添加路由
 * @Author: mTm
 * @Date: 2021-04-10 23:55:38
 * @LastEditTime: 2021-04-21 16:51:37
 * @LastEditors: mTm
 */
import * as fs from 'fs';
import * as Router from 'koa-router'

import { NGINX_PREFIX } from '../app/config'

const koaRouter = new Router()

const useRoutes = function(app: any) {
  fs.readdirSync(__dirname)
  .filter((file: string) => /\.js$/.test(file))
  .forEach((file: string) => {
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    // 统一添加prefix
    // 用于nginx: 同一域名配置多个api
    if (NGINX_PREFIX) {
      koaRouter.use(NGINX_PREFIX, router.default.routes());
      koaRouter.use(NGINX_PREFIX, router.default.allowedMethods());
    } else {
      app.use(router.default.routes());
      app.use(router.default.allowedMethods());
    }  
  })
  // 统一添加prefix
  // 用于nginx: 同一域名配置多个api
  if (NGINX_PREFIX) {
    app.use(koaRouter.routes())
    app.use(koaRouter.allowedMethods())
  }
}

export default useRoutes;
