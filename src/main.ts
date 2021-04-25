/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 15:17:49
 * @LastEditTime: 2021-04-25 16:54:20
 * @LastEditors: mTm
 */
import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'
import Antd from 'ant-design-vue'
import App from './App.vue'

createApp(App).use(router).use(store).use(Antd).mount('#app')
