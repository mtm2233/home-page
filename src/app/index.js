/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:33:31
 * @LastEditTime: 2021-04-14 22:43:05
 * @LastEditors: mTm
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const errorHandler = require('./error-handler')

const useRoutes = require('../router');

const app = new Koa();

app.use(bodyParser())
useRoutes(app);

app.on('error', errorHandler)

module.exports = app