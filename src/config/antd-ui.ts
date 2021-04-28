/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-28 16:15:02
 * @LastEditTime: 2021-04-28 16:31:37
 * @LastEditors: mTm
 */
import { App, Plugin } from 'vue'
import {
    Layout,
    Input,
    Tree,
    Typography,
    message,
    Tabs,
    Row,
    Col,
    Dropdown,
    Collapse,
    Drawer,
} from 'ant-design-vue'

const plugins: Plugin[] = [
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
]

export const setupAntd = (app: App, options: any = {}): void => {
    app.config.globalProperties.$message = message
    plugins.forEach(plugin => {
        app.use(plugin)
    })
}
