/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-03-28 13:02:11
 * @LastEditTime: 2021-04-14 22:52:36
 * @LastEditors: mTm
 */
const errorType = require('../constants/error-types')

const failCodeMap = new Map([
    [errorType.SERVICE_ERROR, {
        message: 'service error',
        status: 500,
    }],
]);

const errorHandler = (error,ctx) => {
    const message = error.message;
    const failCode = failCodeMap.get(message) || {
        message,
        status: 500,
    }
    ctx.body = failCode;
    ctx.status = failCode.status;
}

module.exports = errorHandler