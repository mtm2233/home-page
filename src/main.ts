/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 15:17:49
 * @LastEditTime: 2021-04-23 20:14:05
 * @LastEditors: mTm
 */
import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'
import Antd from 'ant-design-vue'
import App from './App.vue'

import 'ant-design-vue/dist/antd.css'

createApp(App).use(router).use(store).use(Antd).mount('#app')
