/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-21 16:42:05
 * @LastEditTime: 2021-04-21 17:30:51
 * @LastEditors: mTm
 */
import { Context } from 'koa'
import { ControllerSearchEngine } from '../interface/class/searchEngine.interface'

import service from '../service/searchEngine.service'

import { CONTENT_DOES_NOT_EXISTS } from '../constants/error-types'

class SearchEngineController implements ControllerSearchEngine {
    async list(ctx: Context, next: () => Promise<any>) {
        try {
            const result = await service.list();
            ctx.body = {
                data: result,
                message: "获取搜索引擎列表成功"
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }

    async detail(ctx: Context, next: () => Promise<any>) {
        try {
            const { id } = ctx.params;
            const result = await service.detail(id);
            if (Array.isArray(result) && result.length) {
                ctx.body = {
                    data: result.pop(),
                    message: '获取搜索引擎信息成功'
                }
            } else {
                ctx.app.emit('error', new Error(CONTENT_DOES_NOT_EXISTS), ctx);
            }
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    }
}

export default new SearchEngineController()