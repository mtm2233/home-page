/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-09-21 11:41:45
 * @LastEditTime: 2021-09-22 23:10:48
 * @LastEditors: mTm
 */
export const baseUrl = {
  // 测试
  staging: {
    serve: 'http://localhost:8099',
    sso: 'https://sso.isdream.cn/user',
    file: '',
  },
  // 正式
  production: {
    serve: 'https://api.isdream.cn/homepage',
    sso: 'https://sso.isdream.cn/user',
    file: '',
  },
}
