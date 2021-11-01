/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-01 18:32:36
 * @LastEditTime: 2021-11-01 21:15:51
 * @LastEditors: mTm
 */
import { store } from '@/store'

export default function (): void {
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  const startTime = searchParams.get('startTime')
  if (token) {
    store.commit('setToken', { token, startTime })
    const newPath = location.origin + location.pathname
    // if (history.replaceState) {
    //   history.replaceState(newPath, '', newPath)
    // } else {
    //   location.href = newPath
    // }
    location.href = newPath
  }
}
