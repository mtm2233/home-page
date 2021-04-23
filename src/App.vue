<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-23 15:17:49
 * @LastEditTime: 2021-04-23 16:57:23
 * @LastEditors: mTm
-->
<template>
  <div>
    <HelloWorld />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
