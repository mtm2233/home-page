/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 16:46:17
 * @LastEditTime: 2021-04-25 16:36:59
 * @LastEditors: mTm
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/view/Home.vue'
import Details from '@/view/Details.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '_Home',
    redirect: {
      name: 'Home',
    },
    component: () => import('@/view/home/Home.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
      {
        path: 'details',
        name: 'Details',
        component: Details,
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
