/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-10 23:42:51
 * @LastEditTime: 2021-04-19 00:03:19
 * @LastEditors: mTm
 */
// 环境变量 .env
import * as fs from "fs";
import * as path from "path";

import * as dotenv from "dotenv";

// 公钥 用来解密token
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "../../key/public.key"));

dotenv.config();

const {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

export {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  PUBLIC_KEY,
};
