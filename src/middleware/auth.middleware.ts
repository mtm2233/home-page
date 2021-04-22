/*
 * @Description: 
 * @Author: mTm
 * @Date: 2021-03-28 22:38:58
 * @LastEditTime: 2021-04-22 17:34:22
 * @LastEditors: mTm
 */
import * as jwt from 'jsonwebtoken';
import { Context } from 'koa'

import { PUBLIC_KEY, SYSTEM_USER_ID, SYSTEM_USER_NAME } from '../app/config'
import { 
    UN_AUTH_ORIZATION,
    CONTENT_DOES_NOT_EXISTS,
    UN_AUTH_PERMISSION 
} from '../constants/error-types'
import authService from '../service/auth.service'

const verifyAuth = async (ctx: Context, next: () => Promise<any>) => {
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

const parsingToken = async (ctx: Context, next: () => Promise<any>) => {
    try {
        const token = ctx.headers?.authorization?.replace('Bearer ', '');
        const user = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        ctx.user = user;
        await next()
    } catch(error) {
        ctx.user = {
            id: SYSTEM_USER_ID,
            name: SYSTEM_USER_NAME
        };
        await next();
    }
}

const verifyPermission = async (ctx: Context, next: () => Promise<any>) => {
    try {
        const params = ctx.params;
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
    } catch (error) {
        ctx.app.emit('error', error, ctx);
    }
}

const verifyShowPermission = async (ctx: Context, next: () => Promise<any>) => {
    try {
        const params = ctx.params;
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
    } catch (error) {
        ctx.app.emit('error', error, ctx);
    }
}

export {
    verifyAuth,
    verifyPermission,
    parsingToken,
    verifyShowPermission,
}