/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-27 22:43:23
 * @LastEditTime: 2021-04-27 22:59:50
 * @LastEditors: mTm
 */
import { useStore } from 'vuex'

export function verifyHide(name: string): boolean {
    if (!name) return false
    const store = useStore()
    const typeWebsite = store.state.typeWebsite
    return !typeWebsite.includes(name)
}
