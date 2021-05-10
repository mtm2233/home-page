<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-09 23:22:13
 * @LastEditTime: 2021-05-10 23:45:45
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
import { defineComponent, Ref, ref, reactive, UnwrapRef } from 'vue'

import { tree } from '@/api/type'

import { WebsiteForm, websiteRules, Type, Option } from './config'

export default defineComponent({
  setup() {
    const formRef: Ref<any> = ref()
    const websiteType = ref('Https://')
    const formState: UnwrapRef<WebsiteForm> = reactive({
      pid: undefined,
      name: '',
      website: '',
    })
    const selectTreeData: Ref<any> = ref([])

    const filterTreeNode = (inputValue: string, treeNode: any) => {
      return treeNode.props.label.includes(inputValue)
    }

    const getType = () => {
      tree().then(({ data }) => {
        selectTreeData.value = (function changeKey(data: Type[]): Option[] {
          return data.map(({ id, name, children }: Type) => ({
            label: name,
            value: id,
            children: children ? changeKey(children) : [],
          }))
        })(data)
      })
    }

    getType()

    return {
      formRef,
      websiteType,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formState,
      websiteRules,
      selectTreeData,
      filterTreeNode,
    }
  },
})
</script>
