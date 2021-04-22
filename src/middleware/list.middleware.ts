/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-13 23:38:29
 * @LastEditTime: 2021-04-22 13:03:22
 * @LastEditors: mTm
 */
import { Context } from 'koa'

const limit = (size = 10) => {
    return async (ctx: Context, next: () => Promise<any>) => {
        const { page = 1, pageSize = size } = ctx.query;
        ctx.query.offset = `${(Number(page) - 1) * Number(pageSize)}`;
        ctx.query.size = `${pageSize}`;
        ctx.meta = {
            currentPage: page,
            pageSize: pageSize,
        }
        await next();
    }
}

export {
    limit
}