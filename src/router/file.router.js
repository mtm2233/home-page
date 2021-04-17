/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-17 11:37:38
 * @LastEditTime: 2021-04-17 12:09:42
 * @LastEditors: mTm
 */
const Router = require('koa-router')

const {
    fileHandler,
    imagesResize,
} = require('../middleware/file.middleware')
const {
    upload,
    show,
} = require('../controller/file.controller')

const fileRouter = new Router()

fileRouter.post('/upload', fileHandler, imagesResize, upload);
fileRouter.get('/file/:filename', show);

module.exports = fileRouter;