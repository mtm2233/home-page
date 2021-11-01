/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 16:46:17
 * @LastEditTime: 2021-11-01 21:38:48
 * @LastEditors: mTm
 */
import Nprogress from 'nprogress'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { store } from '@/store'
import config from '@/config'
import db from '@/libs/db'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    redirect: {
      name: 'Home',
    },
    component: () => import('@/view/main/Main.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/view/home/Home.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  Nprogress.start()
  first()
  next()
})

router.afterEach(to => {
  Promise.resolve().then(() => {
    Nprogress.done()
  })
  ;(window.document.title as any) = to?.meta?.title || config.title.main
  window.scrollTo(0, 0)
})

export { router }

const first = () => {
  const token = db.get('token')
  if (!store.state.token && token) {
    store.commit('setToken', { token })
  }
}
