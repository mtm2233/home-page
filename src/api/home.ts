/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 20:51:35
 * @LastEditTime: 2021-04-24 23:38:49
 * @LastEditors: mTm
 */
import service from '@/libs/service'

export function list(data: any[string]): Promise<any> {
  return service.request({
    url: '/api/article/query',
    method: 'POST',
    data,
  })
}
