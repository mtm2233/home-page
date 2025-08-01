/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-10 23:42:51
 * @LastEditTime: 2021-04-22 17:07:03
 * @LastEditors: mTm
 */
import * as dotenv from "dotenv";
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';

// load .env file
dotenv.config();
const envPath = join(__dirname, `../../.env.${process.env.CURRENT_ENV}`);
if (existsSync(envPath)) {
  const config = dotenv.parse(readFileSync(envPath));
  for (const k in config) {
    process.env[k] = config[k];
  }
}

const {
  APP_PORT,
  HS256_SECRET,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  SYSTEM_USER_ID,
  OAUTH_CLIENT_ID,
  OAUTH_REDIRECT_URL,
  OAUTH_CLIENT_SECRET,
  NGINX_PREFIX,
} = process.env;

export {
  APP_PORT,
  HS256_SECRET,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  SYSTEM_USER_ID,
  OAUTH_CLIENT_ID,
  OAUTH_REDIRECT_URL,
  OAUTH_CLIENT_SECRET,
  NGINX_PREFIX,
};
