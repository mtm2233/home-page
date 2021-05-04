/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-03 20:11:10
 * @LastEditTime: 2021-05-03 20:39:06
 * @LastEditors: mTm
 */
import { message as $message } from 'ant-design-vue'

import { store } from '@/store'
import { router } from '@/router'
import config from '@/config'


let changeRouting = false

const failAuth = (error: any) => {
  if (changeRouting) return
  // 清空 token
  store.commit('setToken')
  popFailed(error)
  changeRouting = true
  setTimeout(() => {
    router
      .push({ name: config.loginName })
      .then(() => {
        changeRouting = false
      })
      .catch(() => {
        changeRouting = false
      })
  }, 200)
}

// 错误提示
const popFailed = (error: any) => {
  const { data, message } = error
  $message.warning(data?.message || message)
}

const failCodeMap = new Map([
  [400, { msg: '请求错误', handler: popFailed }],
  [401, { msg: '未认证', handler: failAuth }],
  [403, { msg: '未授权', handler: popFailed }],
  [404, { msg: '请求地址错误' }],
  [405, { msg: '请求方式错误' }],
  [408, { msg: '请求超时', handler: popFailed }],
  [422, { msg: '验证错误', handler: popFailed }],
  [500, { msg: '服务器内部错误', handler: popFailed }],
  [501, { msg: '服务未实现' }],
  [502, { msg: '网关错误' }],
  [503, { msg: '服务不可用' }],
  [504, { msg: '网关超时' }],
  [505, { msg: 'HTTP版本不受支持' }],
  [undefined, { msg: '未知错误', handler: popFailed }],
])

const handlerError = (ctx: any) => {
  try {
    const error = ctx.response || ctx
    const failHandler = failCodeMap.get(error?.status)
    if (failHandler) {
      error.message = error?.data?.message || failHandler.msg
      if (typeof failHandler.handler === 'function') {
        failHandler.handler(error)
      }
    }
    return Promise.reject(error)
  } catch {
    throw new Error(ctx)
  }
}

export default handlerError
