<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-08 09:11:51
 * @LastEditTime: 2021-05-13 00:02:35
 * @LastEditors: mTm
-->
<template>
  <a-button
    v-if="verifyLogin"
    v-show="!is_action"
    type="link"
    class="actions"
    @click="changeAction(true)"
    >编辑</a-button
  >
  <a-space
    v-if="verifyLogin"
    v-show="is_action"
    direction="vertical"
    class="actions"
  >
    <a-space>
      <a-button @click="show">新增</a-button>
      <a-button type="primary">编辑</a-button>
      <a-button type="danger">删除</a-button>
      <a-button type="link" @click="changeAction(false)">取消编辑</a-button>
    </a-space>
    <a-typography-text strong
      >注意：进行编辑、删除操作时,请先选择一项</a-typography-text
    >
  </a-space>
  <Edit v-if="verifyLogin" ref="editRef" v-bind="$attrs" />
</template>
<script lang="ts">
import { defineComponent, ref, computed, Ref } from 'vue'
import { useStore } from 'vuex'

import Edit from './edit/Edit.vue'

export default defineComponent({
  components: {
    Edit,
  },
  props: {
    id: {
      type: Number || undefined,
      default: undefined,
    },
  },
  emits: ['update:editing'],
  setup(props, context) {
    const store = useStore()
    // 是否登录
    const verifyLogin = computed(() => Boolean(store.state.token))
    const is_action = ref(false)
    const editRef: Ref<any> = ref()

    const changeAction = (openAction: boolean) => {
      is_action.value = openAction
      context.emit('update:editing', openAction)
    }

    const show = () => {
      editRef.value.show(props.id)
    }

    return {
      verifyLogin,
      is_action,
      editRef,
      changeAction,
      show,
    }
  },
})
</script>

<style scoped lang="less">
.actions {
  margin-bottom: 10px;
}
</style>
