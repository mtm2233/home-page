/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 20:01:17
 * @LastEditTime: 2021-04-23 20:02:09
 * @LastEditors: mTm
 */
import { createStore } from 'vuex'

export const store = createStore({
  state: {
    count: 0,
  },
  mutations: {
    add(state) {
      state.count++
    },
  },
  actions: {},
  modules: {},
})
