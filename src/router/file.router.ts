/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-17 11:37:38
 * @LastEditTime: 2021-04-19 13:00:28
 * @LastEditors: mTm
 */
import * as Router from 'koa-router'

import {
    fileHandler,
    imagesResize,
} from '../middleware/file.middleware'
import fileController from '../controller/file.controller'

const fileRouter = new Router()

fileRouter.post('/upload', fileHandler as any, imagesResize, fileController.upload);
fileRouter.get('/file/:filename', fileController.show);

export default fileRouter;