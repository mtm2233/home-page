<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-08 09:11:51
 * @LastEditTime: 2021-05-13 00:06:32
 * @LastEditors: mTm
-->
<template>
  <a-modal
    v-model:visible="visible"
    :title="id ? '编辑' : '添加'"
    @ok="handleOk"
    @cancel="cancel"
  >
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="分类">
        <TypeEdit :id="id" ref="typeEdit" @cancel="typeCancel" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="网址"
        ><WebsiteEdit :id="id" ref="websiteEdit" @cancel="websiteCancel"
      /></a-tab-pane>
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
  props: {
    websitePresetCancel: {
      type: Function || undefined,
      default: undefined,
    },
  },
  emits: ['websiteCancel'],

  setup(props) {
    const visible = ref(false)
    const activeKey = ref('1')
    const id: Ref<number | undefined> = ref()

    // refs
    const typeEdit = ref()
    const websiteEdit = ref()
    const handleOk = () => {
      const key = activeKey.value
      if (key === '1') {
        typeEdit.value.handleOk()
      } else {
        websiteEdit.value.handleOk()
      }
    }
    const cancel = () => {
      const key = activeKey.value
      if (key === '1') {
        typeEdit.value.cancel()
      } else {
        websiteEdit.value.cancel()
      }
    }

    const typeCancel = () => {
      websiteEdit.value.cancel()
    }

    const websiteCancel = () => {
      props.websitePresetCancel && props.websitePresetCancel()
    }

    const show = (editId: number | undefined) => {
      id.value = editId
      visible.value = true
    }

    return {
      visible,
      activeKey,
      id,
      show,
      handleOk,
      cancel,
      typeEdit,
      websiteEdit,
      typeCancel,
      websiteCancel,
    }
  },
})
</script>
<style scoped lang='less'>
</style>
