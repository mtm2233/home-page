/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-26 15:18:58
 * @LastEditTime: 2021-04-26 15:19:46
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
