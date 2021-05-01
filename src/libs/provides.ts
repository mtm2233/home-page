/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-27 22:43:23
 * @LastEditTime: 2021-04-28 19:47:38
 * @LastEditors: mTm
 */
import { provide } from 'vue'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'

function verifyHide(name: string): boolean {
  if (!name) return false
  const store = useStore()
  const typeWebsite = store.state.typeWebsite
  return !typeWebsite.includes(name)
}

const provides = {
  verifyHide,
  $message: message,
}

const UseProvides = (): void => {
  Object.entries(provides).forEach(([k, v]) => {
    provide(k, v)
  })
}

export default UseProvides

export { verifyHide }
