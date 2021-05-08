<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-08 09:11:51
 * @LastEditTime: 2021-05-08 09:30:54
 * @LastEditors: mTm
-->
<template>
  <a-modal
    v-model:visible="visible"
    :title="id ? '编辑' : '添加'"
    @ok="handleOk"
    @cancel="cancel"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
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
