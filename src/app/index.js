/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:33:31
 * @LastEditTime: 2021-04-11 23:48:37
 * @LastEditors: mTm
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const useRoutes = require('../router');

const app = new Koa();

app.use(bodyParser())
useRoutes(app);

module.exports = app