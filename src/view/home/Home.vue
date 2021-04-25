<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 16:19:20
 * @LastEditTime: 2021-04-25 18:17:31
 * @LastEditors: mTm
-->
<template>
  <ALayout>
    <ALayoutHeader>header</ALayoutHeader>
    <ALayoutContent>
      <HelloWorld />
      <RouterView />
    </ALayoutContent>
    <ALayoutFooter>Footer</ALayoutFooter>
  </ALayout>
</template>
<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
})
</script>
<style lang="less">
.ant-layout {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
  &-header {
    background-color: #fff;
  }
  &-content {
    box-sizing: border-box;
    padding: 0 50px;
  }
  &-footer {
    height: 60px;
    background-color: #fff;
  }
}
</style>
