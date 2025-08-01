/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-13 22:55:27
 * @LastEditTime: 2021-04-20 00:10:16
 * @LastEditors: mTm
 */
import { Context } from 'koa';
import * as jwt from 'jsonwebtoken';
import { oauthApiToken, oauthApiMe } from 'isdream-oauth';
import service from '../service/user.service';
import {
  OAUTH_CLIENT_ID,
  OAUTH_REDIRECT_URL,
  OAUTH_CLIENT_SECRET,
  HS256_SECRET,
} from '../app/config';

import { ControllerUser } from '../interface/class/user.interface.class';
class UserController implements ControllerUser {
  async list(ctx: Context, next: () => Promise<any>) {
    try {
      const { name = '', offset, size } = ctx.query;
      const result = await service.list(
        name as string,
        offset as string,
        size as string
      );
      ctx.body = {
        message: '获取用户列表成功',
        data: result,
        meta: {
          total: 0,
          page: 1,
          pageSize: 10,
          maxPage: 1,
        },
      };
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  }

  async oauthLogin(ctx: Context, next: () => Promise<any>) {
    try {
      const { code, code_verifier } = ctx.request.body as any;
      const data = await oauthApiToken({
        client_id: OAUTH_CLIENT_ID,
        redirect_uri: OAUTH_REDIRECT_URL,
        client_secret: OAUTH_CLIENT_SECRET,
        code,
        code_verifier,
      });
      const userData: any = await oauthApiMe({
        access_token: data.access_token,
      });

      let user: any = await service.getBySub(userData.sub);
      if (user) {
        await service.update({
          sub: userData.sub,
          name: userData.name,
          avatar: userData.picture,
        });
      } else {
        await service.create({
          sub: userData.sub,
          name: userData.name,
          avatar: userData.picture,
        });
      }
      user = await service.getBySub(userData.sub);
      
      const expires = 30 * 24 * 3600 * 1000

      const token = jwt.sign(
        {
          id: user.id,
        },
        HS256_SECRET,
        {
          algorithm: 'HS256',
          expiresIn: expires,
        }
      );

      ctx.body = {
        message: '[oauth] 登录成功',
        data: {
          user: {
            name: user.name,
            avatar: user.avatar,
          },
          token,
          expires
        },
      };
    } catch (error) {
      ctx.app.emit(
        'error',
        new Error(`[oauth] 登录失败, ${error.message}`),
        ctx
      );
    }
  }
}

export default new UserController();
