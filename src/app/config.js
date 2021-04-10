/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:42:51
 * @LastEditTime: 2021-04-10 23:45:45
 * @LastEditors: mTm
 */
// 环境变量 .env
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  APP_PORT,
} = process.env;