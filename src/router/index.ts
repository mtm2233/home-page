/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 16:46:17
 * @LastEditTime: 2021-04-28 16:51:45
 * @LastEditors: mTm
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
