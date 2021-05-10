/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-22 10:20:10
 * @LastEditTime: 2021-05-07 22:50:32
 * @LastEditors: mTm
 */
import * as Router from 'koa-router'

import websiteController from '../controller/website.controller'
import { verifyAuth, verifyPermission, parsingToken, verifyShowPermission, } from '../middleware/auth.middleware'
import { verifyTypeId } from '../middleware/website.middleware'
import { limit } from '../middleware/list.middleware'

const websiteRouter = new Router({prefix: '/website'})

websiteRouter.post('/', verifyAuth, verifyTypeId, websiteController.create);
websiteRouter.get('/', limit(), parsingToken, websiteController.list);
websiteRouter.get('/type', parsingToken, websiteController.listByTypeAll);
websiteRouter.get('/type/:typeId', parsingToken, verifyShowPermission, websiteController.listByType);
websiteRouter.get('/:websiteId', parsingToken, verifyShowPermission, websiteController.detail);
websiteRouter.patch('/:websiteId', verifyAuth, verifyPermission, verifyTypeId, websiteController.update);
websiteRouter.delete('/:websiteId', verifyAuth, verifyPermission, websiteController.remove);

export default websiteRouter