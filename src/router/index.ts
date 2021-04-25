/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 16:46:17
 * @LastEditTime: 2021-04-25 21:19:59
 * @LastEditors: mTm
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    redirect: {
      name: 'Main',
    },
    component: () => import('@/view/main/Main.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/view/home/Home.vue'),
      },
      {
        path: 'details',
        name: 'Details',
        component: () => import('@/view/details/Details.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
