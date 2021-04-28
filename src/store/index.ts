/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 20:01:17
 * @LastEditTime: 2021-04-28 19:08:10
 * @LastEditors: mTm
 */
import { createStore } from 'vuex'
import db from '@/libs/db'

export const store = createStore({
    state: {
        typeWebsite: db.get('typeWebsite') || [],
        primary: db.get('primary') || {},
        bg: db.get('bg') || '',
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
