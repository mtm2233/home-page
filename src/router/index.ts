/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 16:46:17
 * @LastEditTime: 2021-04-23 16:55:26
 * @LastEditors: mTm
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/view/Home.vue'
import Details from '@/view/Details.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/details',
    name: 'Details',
    component: Details,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
