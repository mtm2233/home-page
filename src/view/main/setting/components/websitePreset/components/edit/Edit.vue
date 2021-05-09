<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-08 09:11:51
 * @LastEditTime: 2021-05-09 23:28:09
 * @LastEditors: mTm
-->
<template>
  <a-modal
    v-model:visible="visible"
    :title="id ? '编辑' : '添加'"
    @ok="handleOk"
    @cancel="cancel"
  >
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="分类"><TypeEdit /></a-tab-pane>
      <a-tab-pane key="2" tab="网址"><WebsiteEdit /></a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'

import TypeEdit from './TypeEdit.vue'
import WebsiteEdit from './WebsiteEdit.vue'

export default defineComponent({
  components: {
    TypeEdit,
    WebsiteEdit,
  },
  setup() {
    const visible = ref(false)
    const activeKey = ref('1')
    const id: Ref<number | null> = ref(null)

    const show = () => {
      visible.value = true
    }
    const handleOk = (editId: number | null) => {
      id.value = editId
      console.log(id)
    }
    const cancel = () => {
      console.log('cancel')
    }

    return {
      visible,
      activeKey,
      id,
      show,
      handleOk,
      cancel,
    }
  },
})
</script>
<style scoped lang='less'>
</style>
