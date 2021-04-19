/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-19 12:05:55
 * @LastEditTime: 2021-04-19 12:07:41
 * @LastEditors: mTm
 */
import { Context, Request } from 'koa'

interface VerifyPermissionRequest extends Request {
    params: any
}

interface VerifyPermissionCtx extends Context {
    request: VerifyPermissionRequest
}

export {
    VerifyPermissionCtx 
}