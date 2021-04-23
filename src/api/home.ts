/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 20:51:35
 * @LastEditTime: 2021-04-23 22:26:04
 * @LastEditors: mTm
 */
import service from '@/libs/service'

export function list(data: any[string]): Promise<any> {
  return service.post('/api/article/query', data)
}
