<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-23 16:48:25
 * @LastEditTime: 2021-04-25 18:26:47
 * @LastEditors: mTm
-->
<template>
  <div>
    <h2>Home</h2>
    store: {{ count }}
    <p>
      <AButton type="primary" @click="handleClick">count++</AButton>
    </p>
    <p>
      <AButton type="primary" @click="goDetail">跳转Details</AButton>
    </p>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { list } from '@/api/home'
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

    list({
      pagenum: 1,
      pagesize: 6,
      search: '',
      tags: '',
      typeId: '',
    }).then(res => {
      const { data } = res
      console.log(data)
    })

    return {
      goDetail,
      count,
      handleClick,
    }
  },
}
</script>

<style></style>
