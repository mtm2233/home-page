/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-28 16:15:02
 * @LastEditTime: 2021-04-28 19:32:48
 * @LastEditors: mTm
 */
import { App, Plugin } from 'vue'
import {
  ConfigProvider,
  Layout,
  Input,
  Tree,
  Typography,
  Tabs,
  Row,
  Col,
  Dropdown,
  Collapse,
  Drawer,
  Tooltip,
} from 'ant-design-vue'

const plugins: Plugin[] = [
  ConfigProvider,
  Layout,
  Input,
  Tree,
  Typography,
  Tabs,
  Row,
  Col,
  Dropdown,
  Collapse,
  Drawer,
  Tooltip,
]

export const setupAntd = (app: App, options: any = {}): void => {
  // app.config.globalProperties.$message = message
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
