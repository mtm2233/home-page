<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-23 16:48:25
 * @LastEditTime: 2021-04-23 20:10:32
 * @LastEditors: mTm
-->
<template>
  <div>
    <h2>Home</h2>
    store: {{ count }}
    <p>
      <button @click="handleClick">count++</button>
    </p>
    <p>
      <button @click="goDetail">跳转Details</button>
    </p>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup(): any {
    const router = useRouter()
    const store = useStore()

    const count = computed(() => store.state.count)
    const handleClick = () => {
      store.commit('add')
    }
    const goDetail = () => {
      router.push({
        name: 'Details',
      })
    }
    return {
      goDetail,
      count,
      handleClick,
    }
  },
}
</script>

<style></style>
