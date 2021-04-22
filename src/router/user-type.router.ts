/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 15:13:24
 * @LastEditTime: 2021-04-22 16:05:28
 * @LastEditors: mTm
 */
import * as Router from 'koa-router'

import userTypeController from '../controller/user-type.controller'

import { verifyAuth, parsingToken } from '../middleware/auth.middleware'

const userTypeRouter = new Router({prefix: '/user-type'});

userTypeRouter.get('/', parsingToken, userTypeController.list);
userTypeRouter.patch('/', verifyAuth, userTypeController.update);

export default userTypeRouter