/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 20:01:17
 * @LastEditTime: 2021-11-03 22:04:40
 * @LastEditors: mTm
 */
import { createStore } from 'vuex'
import db from '@/libs/db'
import service from '@/libs/service'
import config from '@/config'

export const store = createStore({
  state: {
    typeWebsite: db.get('typeWebsite') || [],
    searchWebsite:
      db.get('searchWebsite') === undefined ? true : db.get('searchWebsite'),
    preciseSearch:
      db.get('preciseSearch') === undefined ? false : db.get('preciseSearch'),
    token: '',
    '@primary-color': db.get('@primary-color') || null,
    '@primary-bg': db.get('@primary-bg') || null,
  },
  mutations: {
    changeState(
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
    setToken(state, { token = null, startTime, expires, dbSet = true } = {}) {
      service.setToken(token)
      state.token = token
      if (dbSet) {
        db.set({
          key: 'token',
          value: token,
          expires: expires || config.token.expires * 1000,
          startTime,
        })
      }
    },
  },
  actions: {},
  modules: {},
})
