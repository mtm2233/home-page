/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 15:17:49
 * @LastEditTime: 2021-04-28 21:44:58
 * @LastEditors: mTm
 */
import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'
import { setupAntd } from './config/antd-ui'
import App from './App.vue'

const app = createApp(App)
setupAntd(app)
app.use(router).use(store).mount('#app')
