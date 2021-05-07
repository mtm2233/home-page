/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 20:01:17
 * @LastEditTime: 2021-05-07 17:26:03
 * @LastEditors: mTm
 */
import { createStore } from 'vuex'
import db from '@/libs/db'
import service from '@/libs/service'
import config from '@/config'

export const store = createStore({
  state: {
    typeWebsite: db.get('typeWebsite') || [],
    token: '',
    '@primary-color': db.get('@primary-color') || null,
    '@primary-bg': db.get('@primary-bg') || null,
  },
  mutations: {
    chageState(
      state: any,
      kv: { key: string; value: any; dbSet?: boolean },
    ): void {
      const { key, value, dbSet } = kv
      state[key] = value
      if (dbSet) {
        db.set({
          key,
          value,
        })
      }
    },
    setToken(state, token) {
      service.setToken(token)
      state.token = token
      db.set({
        key: 'token',
        value: token,
        expires: config.token.expires * 1000,
      })
    },
  },
  actions: {},
  modules: {},
})
