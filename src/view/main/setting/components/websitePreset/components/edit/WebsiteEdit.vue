<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-09 23:22:13
 * @LastEditTime: 2021-05-12 23:45:24
 * @LastEditors: mTm
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="websiteRules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="所属分类" name="pid">
      <a-tree-select
        v-model:value="formState.pid"
        allow-clear
        show-search
        :tree-data="selectTreeData"
        :filter-tree-node="filterTreeNode"
      />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="网址" name="website">
      <a-input v-model:value="formState.website">
        <template #addonBefore>
          <a-select v-model:value="websiteType" style="width: 90px">
            <a-select-option value="Http://">Http://</a-select-option>
            <a-select-option value="Https://">Https://</a-select-option>
          </a-select>
        </template>
      </a-input>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, reactive, UnwrapRef, inject } from 'vue'

import { tree } from '@/api/type'
import { websitAdd } from '@/api/website'

import { WebsiteForm, websiteRules, Type, Option } from './config'

export default defineComponent({
  emits: ['cancel'],
  setup(props, context) {
    const message: any = inject('$message')

    const formRef: Ref<any> = ref()
    const websiteType = ref('Https://')
    const formState: UnwrapRef<WebsiteForm> = reactive({
      pid: null,
      name: '',
      website: '',
    })
    const selectTreeData: Ref<any> = ref([])

    const filterTreeNode = (inputValue: string, treeNode: any) => {
      return treeNode.props.label.includes(inputValue)
    }

    const getType = () => {
      tree().then(({ data }) => {
        data = data.map((v: Type) => ({ ...v, disabled: true }))
        selectTreeData.value = (function changeKey(data: Type[]): Option[] {
          return data.map(({ id, name, children, disabled = false }: Type) => ({
            label: name,
            value: id,
            disabled,
            children: children ? changeKey(children) : [],
          }))
        })(data)
      })
    }

    getType()

    const handleOk = () => {
      formRef.value.validate().then(() => {
        console.log(formState)
        websitAdd({
          ...formState,
          website: websiteType.value + formState.website,
        }).then(res => {
          message.success(res.message)
          cancel()
          getType()
          context.emit('cancel')
        })
      })
    }

    const cancel = () => {
      formRef.value.resetFields()
    }

    return {
      formRef,
      websiteType,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formState,
      websiteRules,
      selectTreeData,
      filterTreeNode,
      handleOk,
      cancel,
    }
  },
})
</script>
