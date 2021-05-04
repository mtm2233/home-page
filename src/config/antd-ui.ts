/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-28 16:15:02
 * @LastEditTime: 2021-05-03 22:33:19
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
  Button,
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
  Button,
]

export const setupAntd = (app: App, options: any = {}): void => {
  // app.config.globalProperties.$message = message
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
