/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 20:37:23
 * @LastEditTime: 2021-04-21 21:21:02
 * @LastEditors: mTm
 */
import * as Router from 'koa-router';

import typeController from '../controller/type.controller'
import { verifyAuth } from '../middleware/auth.middleware'

const typeRouter = new Router({prefix: '/type'})

typeRouter.post('/', verifyAuth, typeController.create)

export default typeRouter;