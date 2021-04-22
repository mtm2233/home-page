/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:20:10
 * @LastEditTime: 2021-04-22 10:26:37
 * @LastEditors: mTm
 */
import * as Router from 'koa-router'

import websiteController from '../controller/website.controller'
import { verifyAuth } from '../middleware/auth.middleware'

const websiteRouter = new Router({prefix: '/website'})

websiteRouter.post('/', verifyAuth, websiteController.create)

export default websiteRouter