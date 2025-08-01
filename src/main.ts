/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:29:43
 * @LastEditTime: 2021-04-19 15:13:54
 * @LastEditors: mTm
 */
const app = require('./app');

const { APP_PORT } = require('./app/config')

app.listen(APP_PORT, () => {
    console.log(`启动成功: http://127.0.0.1:${APP_PORT}`);
})