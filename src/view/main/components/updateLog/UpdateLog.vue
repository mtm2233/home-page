<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-06-22 16:35:42
 * @LastEditTime: 2021-06-27 20:07:55
 * @LastEditors: mTm
-->
<template>
  <div>
    <BellOutlined :style="iconStyle" @click="showBell" />
    <AModal
      v-model:visible="visible"
      title="更新日志"
      :footer="null"
      :width="700"
      :body-style="bodyStyle"
      @cancel="cancel"
    >
      <Log title="页面完成" time="2021-04-23~2021-05-03">
        <li>项目初始化</li>
        <li>需求分析</li>
        <li>实现基本的布局</li>
      </Log>
      <Log title="接入SSO" time="2021-05-04~2021-05-21">
        <li>接入SSO单点登录功能</li>
        <li>分类、网址的增删改</li>
        <li>主题、背景的同步、预设</li>
      </Log>
      <Log title="搜索优化、增加更新通知" time="2021-06-22">
        <li>增加更新通知</li>
        <li>通过 "" 进行精准搜索，过滤广告</li>
        <li>搜索优化：当搜索的内容是现有的网址，会直接打开</li>
        <li>以上配置可以在设置->搜索配置 进行开启关闭（默认开启）</li>
      </Log>
    </AModal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { BellOutlined } from '@ant-design/icons-vue'
import Log from './Log.vue'

export default defineComponent({
  components: {
    BellOutlined,
    Log,
  },
  setup() {
    const iconStyle = {
      fontSize: '30px',
      cursor: 'pointer',
    }

    const bodyStyle = {
      height: '60vh',
      overflow: 'auto',
    }

    // model显示隐藏
    const visible = ref(false)

    function cancel() {
      visible.value = false
    }

    function showBell() {
      visible.value = true
    }

    const activeKey = ref(3)
    return {
      iconStyle,
      bodyStyle,
      visible,
      cancel,
      showBell,
      activeKey,
    }
  },
})
</script>
<style scoped lang="less">
.ant-card {
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
}
</style>
