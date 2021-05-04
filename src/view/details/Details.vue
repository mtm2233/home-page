<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-23 16:47:57
 * @LastEditTime: 2021-05-04 18:00:53
 * @LastEditors: mTm
-->
<template>
  <h2>details</h2>
  <button @click="goBack">上一页</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const goBack = () => {
      router.go(-1)
    }
    return {
      goBack,
    }
  },
})
</script>

<style></style>
