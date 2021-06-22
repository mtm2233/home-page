<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-06-22 17:32:02
 * @LastEditTime: 2021-06-22 17:34:08
 * @LastEditors: mTm
-->
<template>
  <ACard :title="title" hoverable>
    <ul>
      <li v-if="time !== '时间'">
        <strong>时间：{{ time }}</strong>
      </li>
      <slot></slot>
    </ul>
  </ACard>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '标题',
    },
    time: {
      type: String,
      default: '时间',
    },
  },
})
</script>
