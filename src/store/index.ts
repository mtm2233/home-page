/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 20:01:17
 * @LastEditTime: 2021-04-27 21:51:45
 * @LastEditors: mTm
 */
import { createStore } from 'vuex'

export const store = createStore({
    state: {
        type: [],
        website: [],
        primary: '',
        bg: '',
    },
    mutations: {
        chageState(state: any, kv: { key: string; val: any }): void {
            state[kv.key] = kv.val
        },
    },
    actions: {},
    modules: {},
})
