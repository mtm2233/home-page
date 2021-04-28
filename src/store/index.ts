/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 20:01:17
 * @LastEditTime: 2021-04-28 22:24:48
 * @LastEditors: mTm
 */
import { createStore } from 'vuex'
import db from '@/libs/db'

export const store = createStore({
    state: {
        typeWebsite: db.get('typeWebsite') || [],
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
    },
    actions: {},
    modules: {},
})
