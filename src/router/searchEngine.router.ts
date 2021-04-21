/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 16:38:49
 * @LastEditTime: 2021-04-21 17:19:15
 * @LastEditors: mTm
 */
import * as Router from 'koa-router';

import searchEngineController from '../controller/searchEngine.controller'

const searchEngineRouter = new Router({prefix: '/search-engine'});

searchEngineRouter.get('/', searchEngineController.list);
searchEngineRouter.get('/:id', searchEngineController.detail)

export default searchEngineRouter;