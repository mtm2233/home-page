/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-26 15:18:58
 * @LastEditTime: 2021-05-14 10:26:15
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

export function typeAdd(data = {}): Promise<any> {
  return service.request({
    url: '/api/type',
    method: 'POST',
    data,
  })
}

export function typeInfo(id: number): Promise<any> {
  return service.request({
    url: `/api/type/${id}`,
    method: 'GET',
  })
}

export function typeEdit(id: number, data = {}): Promise<any> {
  return service.request({
    url: `/api/type/${id}`,
    method: 'PATCH',
    data,
  })
}

export function typeDelete(id: number): Promise<any> {
  return service.request({
    url: `/api/type/${id}`,
    method: 'DELETE',
  })
}