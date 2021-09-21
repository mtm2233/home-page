/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-26 22:02:12
 * @LastEditTime: 2021-09-21 12:12:31
 * @LastEditors: mTm
 */

import { baseUrl } from './url'

const env: any = process?.env?.VUE_APP_MODE || 'staging'

const config = {
  title: {
    main: '起始页',
  },

  token: {
    // 'headers' | 'params' | 'data'
    position: 'headers',
    key: 'Authorization',
    value: 'Bearer TOKEN',
    expires: 7 * 24 * 3600,
  },

  /**
   * @description api请求基础路径
   */
  baseUrl: (baseUrl as any)[env],

  // 储存时间
  expires: 30 * 24 * 3600,
  // 本地存储前缀标识
  dbPrefix: 'homePage',
  loginName: 'Login',
}

export default config
