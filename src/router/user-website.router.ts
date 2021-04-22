/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 16:20:38
 * @LastEditTime: 2021-04-22 16:24:28
 * @LastEditors: mTm
 */
import * as Router from 'koa-router'

import userWebsiteController from '../controller/user-website.controller'

import { verifyAuth, parsingToken } from '../middleware/auth.middleware'

const userWebsiteRouter = new Router({prefix: '/user-website'});

userWebsiteRouter.get('/', parsingToken, userWebsiteController.list);
userWebsiteRouter.patch('/', verifyAuth, userWebsiteController.update);

export default userWebsiteRouter