/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-01 18:32:36
 * @LastEditTime: 2021-05-04 18:39:46
 * @LastEditors: mTm
 */
import { store } from '@/store'

export default function (): void {
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  if (token) {
    store.commit('setToken', token)
    const newPath = location.origin + location.pathname
    // if (history.replaceState) {
    //   history.replaceState(newPath, '', newPath)
    // } else {
    //   location.href = newPath
    // }
    location.href = newPath
  }
}
