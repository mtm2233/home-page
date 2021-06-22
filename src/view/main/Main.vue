<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 16:19:20
 * @LastEditTime: 2021-06-22 17:31:31
 * @LastEditors: mTm
-->
<template>
  <ALayout>
    <ALayoutHeader>
      <Refresh />
      <div>
        <ASpace size="large">
          <UpdateLog />
          <Setting />
        </ASpace>
      </div>
    </ALayoutHeader>
    <ALayoutContent>
      <RouterView />
    </ALayoutContent>
    <ALayoutFooter><Footer /></ALayoutFooter>
  </ALayout>
</template>
<script lang="ts">
import Setting from './components/Setting.vue'
import Refresh from './components/Refresh.vue'
import Footer from './components/Footer.vue'
import UpdateLog from './components/updateLog/UpdateLog.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Main',
  components: {
    Refresh,
    Setting,
    Footer,
    UpdateLog,
  },
})
</script>
<style lang="less">
.ant-layout {
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
  &-header {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 50px 65px;
  }
  &-content {
    box-sizing: border-box;
    padding: 50px 0;
    background-color: #fff;
    height: 100%;
  }
  &-footer {
    background-color: #fff;
  }
}
</style>
