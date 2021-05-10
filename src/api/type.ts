/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-26 15:18:58
 * @LastEditTime: 2021-05-10 23:27:13
 * @LastEditors: mTm
 */
import service from '@/libs/service'

export function list(params = {}): Promise<any> {
  return service.request({
    url: '/api/type',
    method: 'GET',
    params,
  })
}

export function tree(): Promise<any> {
  return service.request({
    url: '/api/type/tree',
    method: 'GET',
  })
}