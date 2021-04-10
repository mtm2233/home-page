/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:33:31
 * @LastEditTime: 2021-04-10 23:57:08
 * @LastEditors: mTm
 */
const Koa = require('koa')

const useRoutes = require('../router');

const app = new Koa();

useRoutes(app);

module.exports = app