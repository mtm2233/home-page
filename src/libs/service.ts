/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 20:34:54
 * @LastEditTime: 2021-04-23 22:30:59
 * @LastEditors: mTm
 */
import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = 'https:api.isdream.cn/'

//post请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
//设置超时
axios.defaults.timeout = 10000

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    alert(`异常请求：${JSON.stringify(error.message)}`)
  },
)

class MyRequest {
  post(url: string, data: any[string]): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: qs.stringify(data),
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  get(url: string, data: any[string]): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: data,
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
