/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 20:37:23
 * @LastEditTime: 2021-05-10 23:17:05
 * @LastEditors: mTm
 */
import * as Router from 'koa-router';

import typeController from '../controller/type.controller'
import { verifyAuth, verifyPermission, parsingToken, verifyShowPermission } from '../middleware/auth.middleware'

const typeRouter = new Router({prefix: '/type'})

typeRouter.post('/', verifyAuth, typeController.create)
typeRouter.get('/', parsingToken, typeController.list)
typeRouter.get('/tree', parsingToken, typeController.listTree)
typeRouter.get('/:typeId', parsingToken, verifyShowPermission, typeController.detail)
typeRouter.patch('/:typeId', verifyAuth, verifyPermission, typeController.update)
typeRouter.delete('/:typeId', verifyAuth, verifyPermission, typeController.remove)

export default typeRouter;