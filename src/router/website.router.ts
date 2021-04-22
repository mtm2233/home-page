/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:20:10
 * @LastEditTime: 2021-04-22 14:59:36
 * @LastEditors: mTm
 */
import * as Router from 'koa-router'

import websiteController from '../controller/website.controller'
import { verifyAuth, verifyPermission } from '../middleware/auth.middleware'
import { verifyTypeId } from '../middleware/website.middleware'
import { limit } from '../middleware/list.middleware'

const websiteRouter = new Router({prefix: '/website'})

websiteRouter.post('/', verifyAuth, verifyTypeId, websiteController.create);
websiteRouter.get('/', limit(), websiteController.list);
websiteRouter.get('/type/:typeId', websiteController.listByType);
websiteRouter.get('/:websiteId', websiteController.detail);
websiteRouter.patch('/:websiteId', verifyAuth, verifyPermission, verifyTypeId, websiteController.update);

export default websiteRouter