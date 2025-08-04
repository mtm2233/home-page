<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-08 09:11:51
 * @LastEditTime: 2021-09-21 14:08:42
 * @LastEditors: mTm
-->
<template>
  <a-button
    v-if="verifyLogin"
    v-show="!is_action"
    type="link"
    class="actions"
    style="padding: 0; height: auto"
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
      <a-button @click="show(false)">新增</a-button>
      <a-button type="primary" @click="show(true)">编辑</a-button>

      <a-popconfirm
        title="确认要删除、数据不可恢复？"
        :disabled="!id"
        @confirm="remove"
      >
        <template #icon
          ><question-circle-outlined style="color: red"
        /></template>
        <a-button type="danger" @click="verifyId">删除</a-button>
      </a-popconfirm>
      <a-button
        type="link"
        style="padding: 0; height: auto"
        @click="changeAction(false)"
        >取消编辑</a-button
      >
    </a-space>
    <a-typography-text strong
      >注意：进行编辑、删除操作时,请先选择一项</a-typography-text
    >
  </a-space>
  <div class="actions">
    <a-typography-text strong>注意：勾选的内容将会被隐藏</a-typography-text>
  </div>
  <Edit
    v-if="verifyLogin"
    :id="id"
    ref="editRef"
    :website-preset-cancel="websitePresetCancel"
  />
</template>
<script lang="ts">
import { defineComponent, ref, computed, Ref, inject } from 'vue'
import { useStore } from 'vuex'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

import { typeDelete } from '@/api/type'
import { websitDelete } from '@/api/website'

import Edit from './Edit.vue'

export default defineComponent({
  components: {
    Edit,
    QuestionCircleOutlined,
  },
  props: {
    id: {
      type: String || undefined,
      default: undefined,
    },
    websitePresetCancel: {
      type: Function || undefined,
      default: undefined,
    },
  },
  emits: ['update:editing'],
  setup(props, context) {
    const message: any = inject('$message')

    const store = useStore()
    // 是否登录
    const verifyLogin = computed(() => Boolean(store.state.token))
    const is_action = ref(false)
    const editRef: Ref<any> = ref()

    const changeAction = (openAction: boolean) => {
      is_action.value = openAction
      context.emit('update:editing', openAction)
    }

    const show = (is_edit: boolean) => {
      editRef.value.show(is_edit)
    }

    const remove = () => {
      const numId = Number(`${props.id}`.replace(/[tw]/g, ''))
      if (`${props.id}`.search('t') !== -1) {
        typeDelete(numId).then(() => {
          props.websitePresetCancel && props.websitePresetCancel()
        })
      } else {
        websitDelete(numId).then(() => {
          props.websitePresetCancel && props.websitePresetCancel()
        })
      }
    }

    const verifyId = () => {
      if (!props.id) {
        message.warning('请先选择要删除的数据')
      }
    }

    return {
      verifyLogin,
      is_action,
      editRef,
      changeAction,
      show,

      remove,
      verifyId,
    }
  },
})
</script>

<style scoped lang="less">
.actions {
  margin-bottom: 6px;
}
</style>
