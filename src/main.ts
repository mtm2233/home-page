/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 15:17:49
 * @LastEditTime: 2021-05-04 17:47:13
 * @LastEditors: mTm
 */
import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'
import { setupAntd } from './config/antd-ui'
import bootstrap from './libs/bootstrap'

import App from './App.vue'

// 接入sso登录
bootstrap()

const app = createApp(App)
setupAntd(app)
app.use(router).use(store).mount('#app')
