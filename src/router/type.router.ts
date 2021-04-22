/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 20:37:23
 * @LastEditTime: 2021-04-21 23:05:56
 * @LastEditors: mTm
 */
import * as Router from 'koa-router';

import typeController from '../controller/type.controller'
import { verifyAuth, verifyPermission } from '../middleware/auth.middleware'

const typeRouter = new Router({prefix: '/type'})

typeRouter.post('/', verifyAuth, typeController.create)
typeRouter.get('/', typeController.list)
typeRouter.get('/:typeId', typeController.detail)
typeRouter.patch('/:typeId', verifyAuth, verifyPermission, typeController.update)

export default typeRouter;