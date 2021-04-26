<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-23 15:17:49
 * @LastEditTime: 2021-04-25 18:04:50
 * @LastEditors: mTm
-->
<template>
    <AConfigProvider :locale="locale" :auto-insert-space-in-button="false">
        <RouterView />
    </AConfigProvider>
</template>

<script lang="ts">
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import { defineComponent } from 'vue'
export default defineComponent({
    name: 'App',
    setup() {
        return {
            locale: zh_CN,
        }
    },
})
</script>

<style lang="less">
@import './assets/style/index.less';

body {
    overflow-y: auto;
}
</style>
