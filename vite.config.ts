/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 15:17:49
 * @LastEditTime: 2021-11-03 21:45:33
 * @LastEditors: mTm
 */
import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import viteCompression from 'vite-plugin-compression'

import { resolve } from 'path'
import config from './src/config'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): any => {
  return defineConfig({
    define: {
      'process.env': {},
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
        { find: /^~/, replacement: '' },
      ],
    },
    optimizeDeps: {
      include: ['axios'],
    },
    plugins: [
      vue(),
      viteCompression(),
      styleImport({
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: name => {
              return `ant-design-vue/es/${name}/style/index`
            },
          },
        ],
      }),
    ],
    build: {
      // 去除console
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // rollupOptions: {
      //   output: {
      //     manualChunks(id) {
      //       if (id.includes('node_modules')) {
      //         return id
      //           .toString()
      //           .split('node_modules/')[1]
      //           .split('/')[0]
      //           .toString()
      //       }
      //     },
      //   },
      // },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    base: '/', // 开发或生产环境服务的公共基础路径
    server: {
      host: 'localhost',
      port: 3001, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      https: false,
      cors: true, // 允许跨域
      // 设置代理
      proxy: {
        '^/api/.*': {
          target: config.baseUrl.serve,
          // target: 'http://localhost:8099',
          changeOrigin: true, // 将主机标头的来源更改为目标URL,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}
