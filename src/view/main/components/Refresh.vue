<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 18:23:15
 * @LastEditTime: 2021-05-21 09:13:05
 * @LastEditors: mTm
-->
<template>
  <a-tooltip title="刷新页面" :mouse-enter-delay="0.6" :color="color">
    <ATypographyTitle @click="reload">R</ATypographyTitle>
  </a-tooltip>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const reload = () => {
      if (router?.currentRoute?.value?.name === 'Home') {
        router.go(0)
      } else {
        router.push({
          name: 'Home',
        })
      }
    }
    const color = computed(
      () =>
        store.state['@primary-color']?.variables?.['@primary-color'] ||
        '#000000bf',
    )
    return {
      reload,
      color,
    }
  },
})
</script>

<style scoped>
.ant-typography {
  cursor: pointer;
}
</style>
