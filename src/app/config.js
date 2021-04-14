/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:42:51
 * @LastEditTime: 2021-04-14 22:28:33
 * @LastEditors: mTm
 */
// 环境变量 .env
const fs = require('fs')
const path = require('path')

const dotenv = require("dotenv");

// 公钥 用来解密token
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './key/public.key'))

dotenv.config();

module.exports = {
  APP_PORT,
} = process.env;

module.exports.PUBLIC_KEY = PUBLIC_KEY;