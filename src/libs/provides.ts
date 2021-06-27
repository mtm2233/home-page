/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-27 22:43:23
 * @LastEditTime: 2021-06-27 21:40:31
 * @LastEditors: mTm
 */
import { provide } from 'vue'
// import { useStore } from 'vuex'
import { store } from '@/store/index'
import { message } from 'ant-design-vue'

function verifyHide(name: string): boolean {
  if (!name) return false
  const typeWebsite = store.state.typeWebsite
  if (!Array.isArray(typeWebsite)) {
    return true
  }
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
