/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-26 17:35:03
 * @LastEditTime: 2021-05-14 15:22:46
 * @LastEditors: mTm
 */
import service from '@/libs/service'

export function websiteByType(typeId: number | null): Promise<any> {
  return service.request({
    url: `/api/website/type/${typeId}`,
    method: 'GET',
  })
}

export function websiteByTypeAll(): Promise<any> {
  return service.request({
    url: `/api/website/type`,
    method: 'GET',
  })
}

export function websitAdd(data = {}): Promise<any> {
  return service.request({
    url: `/api/website`,
    method: 'POST',
    data,
  })
}

export function websitInfo(id: number, data = {}): Promise<any> {
  return service.request({
    url: `/api/website/${id}`,
    method: 'GET',
    data,
  })
}

export function websitEdit(id: number, data = {}): Promise<any> {
  return service.request({
    url: `/api/website/${id}`,
    method: 'PATCH',
    data,
  })
}

export function websitDelete(id: number): Promise<any> {
  return service.request({
    url: `/api/website/${id}`,
    method: 'DELETE',
  })
}