<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-23 16:47:57
 * @LastEditTime: 2021-04-23 17:13:00
 * @LastEditors: mTm
-->
<template>
  <h2>details</h2>
  <button @click="goBack">上一页</button>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
export default {
  setup(): any {
    const router = useRouter()
    const goBack = () => {
      router.go(-1)
    }
    return {
      goBack,
    }
  },
}
</script>

<style></style>
