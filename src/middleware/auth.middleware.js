/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-03-28 22:38:58
 * @LastEditTime: 2021-04-14 23:06:31
 * @LastEditors: mTm
 */
const jwt = require('jsonwebtoken');

const { PUBLIC_KEY } = require('../app/config')
const { UN_AUTH_ORIZATION } = require('../constants/error-types')

const verifyAuth = async (ctx, next) => {
    try {
        const token = ctx.headers?.authorization?.replace('Bearer ', '');
        const user = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        ctx.user = user;
        await next()
    } catch(e) {
        const error = new Error(UN_AUTH_ORIZATION);
        ctx.app.emit('error', error, ctx);
    }
}

module.exports = {
    verifyAuth,
}