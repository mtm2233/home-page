/*
 * @Description: 自动化添加路由
 * @Author: mTm
 * @Date: 2021-04-10 23:55:38
 * @LastEditTime: 2021-04-21 16:51:37
 * @LastEditors: mTm
 */
import * as fs from 'fs';

const useRoutes = function(app: any) {
  fs.readdirSync(__dirname)
  .filter((file: string) => /\.js$/.test(file))
  .forEach((file: string) => {
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    app.use(router.default.routes());
    app.use(router.default.allowedMethods());
  })
}

export default useRoutes;