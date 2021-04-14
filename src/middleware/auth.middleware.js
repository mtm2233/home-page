/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-03-28 22:38:58
 * @LastEditTime: 2021-04-14 23:12:32
 * @LastEditors: mTm
 */
const jwt = require('jsonwebtoken');

const { PUBLIC_KEY } = require('../app/config')
const { 
    UN_AUTH_ORIZATION,
    CONTENT_DOES_NOT_EXISTS,
    UN_AUTH_PERMISSION
} = require('../constants/error-types')
const authService = require('../service/auth.service')

const verifyAuth = async (ctx, next) => {
    try {
        const token = ctx.headers?.authorization?.replace('Bearer ', '');
        const user = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        ctx.user = user;
        await next()
    } catch(error) {
        ctx.app.emit('error', new Error(UN_AUTH_ORIZATION), ctx);
    }
}

const verifyPermission = async (ctx, next) => {
    const params = ctx.request.params;
    const [key] = Object.keys(params);
    const tableName = key.replace('Id', '');
    const id = params[key];
    const userId = ctx.user.id;

    const isExistsResult = await authService.isExists(tableName, id);
    if (!isExistsResult) {
        ctx.app.emit('error', new Error(CONTENT_DOES_NOT_EXISTS), ctx);
        return false;
    }
    
    const result = await authService.authPermission(tableName, id, userId);
    if (!result) {
        ctx.app.emit('error', new Error(UN_AUTH_PERMISSION), ctx);
        return false;
    }

    await next();
}

module.exports = {
    verifyAuth,
    verifyPermission
}