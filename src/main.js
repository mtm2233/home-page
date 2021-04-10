/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:29:43
 * @LastEditTime: 2021-04-10 23:43:46
 * @LastEditors: mTm
 */
const app = require('./app');

const { APP_PORT } = require('./app/config')

app.listen(APP_PORT, () => {
    console.log(`项目启动成功: localhost:${APP_PORT}`);
})