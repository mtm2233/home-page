/*
 * @Description: 自动化添加路由
 * @Author: mTm
 * @Date: 2021-04-10 23:55:38
 * @LastEditTime: 2021-04-10 23:56:22
 * @LastEditors: mTm
 */
const fs = require('fs');

const useRoutes = function(app) {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  })
}

module.exports = useRoutes;