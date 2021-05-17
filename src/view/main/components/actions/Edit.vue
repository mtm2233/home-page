<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-08 09:11:51
 * @LastEditTime: 2021-05-17 10:00:17
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
          ref="typeEditRef"
          :is-edit="isEdit"
          @cancel="typeCancel"
        />
      </a-tab-pane>
      <a-tab-pane v-show="!isEdit || !idIsType" key="2" tab="网址">
        <WebsiteEdit
          :id="id"
          ref="websiteEditRef"
          :is-edit="isEdit"
          @cancel="websiteCancel"
      /></a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, computed, nextTick, ComputedRef } from 'vue'

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
    const typeEditRef = ref()
    const websiteEditRef = ref()
    const handleOk = () => {
      const key = activeKey.value
      if (key === '1') {
        typeEditRef.value.handleOk()
      } else {
        websiteEditRef.value.handleOk()
      }
    }
    const cancel = () => {
      visible.value = false
      // const key = activeKey.value
      // if (key === 1) {
      //   typeEditRef.value.cancel()
      // } else {
      //   websiteEditRef.value.cancel()
      // }
    }

    const typeCancel = () => {
      props.websitePresetCancel && props.websitePresetCancel()
      websiteEditRef.value?.cancel()
      cancel()
    }

    const websiteCancel = () => {
      props.websitePresetCancel && props.websitePresetCancel()
      cancel()
    }

    const _isEdit: Ref<boolean> = ref(false)
    const isEdit: ComputedRef<boolean> = computed(() =>
      Boolean(props.id && _isEdit.value),
    )
    const idIsType = computed(() => props.id?.search('t') !== -1)

    const show = (is_edit: boolean) => {
      _isEdit.value = is_edit
      if (is_edit && props.id?.search('t') !== -1) {
        activeKey.value = '1'
      } else if (is_edit) {
        activeKey.value = '2'
      }

      nextTick(() => {
        typeEditRef.value?.init()
        websiteEditRef.value?.init()
      })
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
      typeEditRef,
      websiteEditRef,
      typeCancel,
      websiteCancel,
    }
  },
})
</script>
<style scoped lang='less'>
</style>
