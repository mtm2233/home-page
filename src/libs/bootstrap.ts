/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-01 18:32:36
 * @LastEditTime: 2021-05-01 18:34:44
 * @LastEditors: mTm
 */
import { useStore } from 'vuex'

export default function (): void {
  const store = useStore()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  if (token) {
    store.commit('setToken', { token, remember: true })
    const newPath = location.origin + location.pathname
    if (history.replaceState) {
      history.replaceState(newPath, '', newPath)
    } else {
      location.href = newPath
    }
  }
}
