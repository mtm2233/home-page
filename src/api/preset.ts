/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-15 22:30:29
 * @LastEditTime: 2021-05-15 22:58:33
 * @LastEditors: mTm
 */
import service from '@/libs/service'

// type
export function typeSet(data = {}): Promise<any> {
  return service.request({
    url: '/api/user-type',
    method: 'PATCH',
    data,
  })
}

export function typeGet(params = {}): Promise<any> {
  return service.request({
    url: '/api/user-type',
    method: 'GET',
    params,
  })
}

// website
export function websiteSet(data = {}): Promise<any> {
  return service.request({
    url: '/api/user-website',
    method: 'PATCH',
    data,
  })
}

export function websiteGet(params = {}): Promise<any> {
  return service.request({
    url: '/api/user-website',
    method: 'GET',
    params,
  })
}
