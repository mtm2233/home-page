<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 16:19:20
 * @LastEditTime: 2021-04-25 21:16:16
 * @LastEditors: mTm
-->
<template>
  <ALayout>
    <ALayoutHeader>
      <Refresh />
      <Edit />
    </ALayoutHeader>
    <ALayoutContent>
      <RouterView />
    </ALayoutContent>
    <ALayoutFooter><Footer /></ALayoutFooter>
  </ALayout>
</template>
<script lang="ts">
import Refresh from './components/Refresh.vue'
import Edit from './components/Edit.vue'
import Footer from './components/Footer.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Home',
  components: {
    Refresh,
    Edit,
    Footer,
  },
})
</script>
<style lang="less">
.ant-layout {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
  padding: 0 65px;
  &-header {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 50px 0;
  }
  &-content {
    box-sizing: border-box;
    padding: 50px;
  }
  &-footer {
    background-color: #fff;
  }
}
</style>
