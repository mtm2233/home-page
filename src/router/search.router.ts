/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 16:38:49
 * @LastEditTime: 2021-04-22 18:05:20
 * @LastEditors: mTm
 */
import * as Router from 'koa-router';

import searchController from '../controller/search.controller'

const searchRouter = new Router({prefix: '/search'});

searchRouter.get('/', searchController.list);
searchRouter.get('/:id', searchController.detail)

export default searchRouter;