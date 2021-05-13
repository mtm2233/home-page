<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-08 09:11:51
 * @LastEditTime: 2021-05-13 16:26:13
 * @LastEditors: mTm
-->
<template>
  <a-modal
    v-model:visible="visible"
    :title="isEdit ? '编辑' : '添加'"
    @ok="handleOk"
    @cancel="cancel"
  >
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-show="!isEdit || idIsType" key="1" tab="分类">
        <TypeEdit
          :id="id"
          ref="typeEdit"
          :is-edit="isEdit"
          @cancel="typeCancel"
        />
      </a-tab-pane>
      <a-tab-pane v-show="!isEdit || !idIsType" key="2" tab="网址">
        <WebsiteEdit
          :id="id"
          ref="websiteEdit"
          :is-edit="isEdit"
          @cancel="websiteCancel"
      /></a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, computed } from 'vue'

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
    id: {
      type: String || undefined,
      default: undefined,
    },
  },
  emits: ['websiteCancel'],

  setup(props) {
    const visible = ref(false)
    const activeKey = ref('1')

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
      // const key = activeKey.value
      // if (key === 1) {
      //   typeEdit.value.cancel()
      // } else {
      //   websiteEdit.value.cancel()
      // }
    }

    const typeCancel = () => {
      websiteEdit.value.cancel()
    }

    const websiteCancel = () => {
      props.websitePresetCancel && props.websitePresetCancel()
    }

    const _isEdit: Ref<boolean> = ref(false)
    const isEdit = computed(() => props.id && _isEdit.value)
    const idIsType = computed(() => props.id?.search('t') !== -1)

    const show = (is_edit: boolean) => {
      _isEdit.value = is_edit
      if (is_edit && props.id?.search('t') !== -1) {
        activeKey.value = '1'
      } else if (is_edit) {
        activeKey.value = '2'
      }

      visible.value = true
    }

    return {
      visible,
      activeKey,
      isEdit,
      idIsType,
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
