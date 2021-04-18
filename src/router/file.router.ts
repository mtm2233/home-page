/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-17 11:37:38
 * @LastEditTime: 2021-04-18 23:39:23
 * @LastEditors: mTm
 */
import * as Router from 'koa-router'

import {
    fileHandler,
    imagesResize,
} from '../middleware/file.middleware'
import fileController from '../controller/file.controller'

const fileRouter = new Router()

fileRouter.post('/upload', fileHandler, imagesResize, fileController.upload as any);
fileRouter.get('/file/:filename', fileController.show as any);

export default fileRouter;