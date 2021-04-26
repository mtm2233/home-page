/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 15:17:49
 * @LastEditTime: 2021-04-25 21:55:54
 * @LastEditors: mTm
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, 'src'),
            },
            { find: /^~/, replacement: '' },
        ],
    },
    server: {
        proxy: {
            '^/api/.*': {
                // target: 'https://api.isdream.cn',
                target: 'http://localhost:8099',
                changeOrigin: true, // 将主机标头的来源更改为目标URL,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
    optimizeDeps: {
        include: ['axios'],
    },
    plugins: [vue()],
})
