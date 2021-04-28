<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-23 15:17:49
 * @LastEditTime: 2021-04-28 21:48:06
 * @LastEditors: mTm
-->
<template>
    <AConfigProvider :locale="locale" :auto-insert-space-in-button="false">
        <RouterView />
    </AConfigProvider>
</template>

<script lang="ts">
import UseProvides from '@/libs/provides'
import styleInit from '@/libs/init'
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import { defineComponent } from 'vue'
export default defineComponent({
    name: 'App',
    setup() {
        UseProvides()
        styleInit()
        return {
            locale: zh_CN,
        }
    },
})
</script>

<style lang="less">
@import './assets/styles/index.less';

body {
    overflow-y: auto;
}
</style>
