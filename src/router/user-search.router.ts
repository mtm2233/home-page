/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 15:13:24
 * @LastEditTime: 2021-04-22 22:20:46
 * @LastEditors: mTm
 */
import * as Router from 'koa-router'

import userSearchController from '../controller/user-search.controller'

import { verifyAuth, parsingToken } from '../middleware/auth.middleware'

const userSearchRouter = new Router({prefix: '/user-search'});

userSearchRouter.get('/', parsingToken, userSearchController.list);
userSearchRouter.patch('/', verifyAuth, userSearchController.update);

export default userSearchRouter