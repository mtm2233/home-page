/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-28 21:43:21
 * @LastEditTime: 2021-04-28 22:36:33
 * @LastEditors: mTm
 */
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'

function styleInit(): void {
    const store = useStore()
    const state = store.state
    let variables: any = {}
    ;['@primary-color', '@primary-bg'].forEach(k => {
        if (state[k] && state[k].variables) {
            variables = Object.assign(variables, state[k].variables)
        }
    })
    ;(window as any).less.modifyVars(variables).catch(() => {
        message.warning('样式初始化失败')
    })
}

export default styleInit
