/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 20:34:54
 * @LastEditTime: 2021-08-21 22:42:37
 * @LastEditors: mTm
 */
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import Nprogress from 'nprogress'

import config from '@/config'

import handlerError from './common/handlerError'

if (import.meta.env.PROD) {
  axios.defaults.baseURL = 'https://api.isdream.cn/homepage'
}

//post请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
//设置超时
axios.defaults.timeout = 10000

let tokenConfig: any = {}

// 请求拦截
axios.interceptors.request.use(
  (config: any) => {
    const { method = 'GET', params = {}, url } = config
    if (import.meta.env.PROD) {
      config.url = url.replace(/^\/api/, '')
    }
    if (method === 'GET' && qs.stringify(params)) {
      config.url = url + '?' + qs.stringify(params)
    }
    if (tokenConfig.value) {
      config[tokenConfig.position][tokenConfig.key] = tokenConfig.value
    }
    Nprogress.start()
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 响应拦截
axios.interceptors.response.use(
  res => {
    Nprogress.done()
    return res
  },
  error => {
    if (error.constructor.name === 'Cancel') return Promise.reject(error)
    Nprogress.done()
    return handlerError(error)
  },
)
class MyRequest {
  // 设置 token, 注: 由 commit('user/setToken') 触发
  setToken(token: string) {
    tokenConfig = {
      ...config.token,
      value: token ? config.token.value.replace('TOKEN', token) : null,
    }
  }
  request(config: AxiosRequestConfig): Promise<any> {
    const { method = 'GET', data = {}, url } = config
    return new Promise((resolve, reject) => {
      axios({
        method,
        url,
        data,
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default new MyRequest()
