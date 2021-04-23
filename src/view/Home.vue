<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-23 16:48:25
 * @LastEditTime: 2021-04-23 17:08:32
 * @LastEditors: mTm
-->
<template>
  <div>
    <h2>Home</h2>
    <button @click="goDetail">跳转Details</button>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
export default {
  setup(): any {
    const router = useRouter()
    const goDetail = () => {
      router.push({
        name: 'Details',
      })
    }
    return {
      goDetail,
    }
  },
}
</script>

<style></style>
