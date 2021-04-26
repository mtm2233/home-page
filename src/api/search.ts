/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-25 21:56:11
 * @LastEditTime: 2021-04-25 22:47:56
 * @LastEditors: mTm
 */
import service from '@/libs/service'

export function list(params = {}): Promise<any> {
    return service.request({
        url: '/api/search',
        method: 'GET',
        params,
    })
}
