<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 20:58:05
 * @LastEditTime: 2021-09-21 12:02:51
 * @LastEditors: mTm
-->
<template>
  <p v-for="v in footList" :key="v.name">
    {{ v.name }}
    <ATypographyText keyboard @click="goUrl(v)">{{ v.link }}</ATypographyText>
  </p>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

interface footItem {
  name: string
  link: string
  url?: string
}

export default defineComponent({
  setup() {
    const footList: footItem[] = [
      {
        name: 'ICP备案号',
        link: '苏ICP备19073933号-2',
        url: 'http://beian.miit.gov.cn',
      },
      {
        name: '备案苏公网安备',
        link: '32031202000595号',
        url: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32031202000595',
      },
      {
        name: 'Copyright © ',
        link: 'isdream.cn',
        url: 'https://isdream.cn/',
      },
    ]
    const goUrl = (item: footItem) => {
      if (item.url) {
        window.open(item.url)
      }
    }
    return {
      footList,
      goUrl,
    }
  },
})
</script>
<style scoped lang="less">
p {
  text-align: center;
  .ant-typography {
    cursor: pointer;
  }
}
</style>
