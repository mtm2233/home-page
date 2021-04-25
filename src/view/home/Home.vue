<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 22:02:34
 * @LastEditTime: 2021-04-25 22:06:16
 * @LastEditors: mTm
-->
<template>
  <Search />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Search from './components/Search.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Search,
  },
  setup() {
    return {}
  },
})
</script>
<style scoped>
.search {
  padding: 0 65px;
}
</style>
