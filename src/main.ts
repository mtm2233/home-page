/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 15:17:49
 * @LastEditTime: 2021-04-23 20:02:40
 * @LastEditors: mTm
 */
import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'
import App from './App.vue'

createApp(App).use(router).use(store).mount('#app')
