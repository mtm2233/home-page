/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-13 23:38:29
 * @LastEditTime: 2021-04-18 23:11:46
 * @LastEditors: mTm
 */
const limit = async (ctx: any, next: any) => {
    const { page = 1, pageSize = 10 } = ctx.query;
    ctx.query.offset = `${(page - 1) * pageSize}`;
    ctx.query.size = `${pageSize}`;
    await next();
}

export {
    limit
}