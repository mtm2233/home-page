/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 16:38:49
 * @LastEditTime: 2021-04-22 18:35:59
 * @LastEditors: mTm
 */
import * as Router from 'koa-router';

import { parsingToken, verifyAuth, verifyPermission, verifyShowPermission } from '../middleware/auth.middleware'

import searchController from '../controller/search.controller'

const searchRouter = new Router({prefix: '/search'});

searchRouter.get('/', parsingToken, searchController.list);
searchRouter.get('/:searchId', parsingToken, verifyShowPermission, searchController.detail);
searchRouter.post('/', verifyAuth, searchController.create);
searchRouter.patch('/:searchId', verifyAuth, verifyPermission, searchController.update);

export default searchRouter;