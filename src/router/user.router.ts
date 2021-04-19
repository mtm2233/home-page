/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-10 23:50:09
 * @LastEditTime: 2021-04-19 13:00:50
 * @LastEditors: mTm
 */
import * as Router from 'koa-router';

import userController from '../controller/user.controller'
import { limit } from '../middleware/list.middleware'
import { verifyAuth } from '../middleware/auth.middleware'

const userRouter = new Router({prefix: '/user'});

userRouter.get('/list', verifyAuth, limit, userController.list);

export default userRouter;