/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-26 17:35:03
 * @LastEditTime: 2021-04-26 17:37:33
 * @LastEditors: mTm
 */
import service from '@/libs/service'

export function websiteByType(typeId: number | null): Promise<any> {
    return service.request({
        url: `/api/website/type/${typeId}`,
        method: 'GET',
    })
}
