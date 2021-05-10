<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-09 23:22:13
 * @LastEditTime: 2021-05-10 22:58:57
 * @LastEditors: mTm
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="typeRules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="上级" name="pid">
      <a-select
        v-model:value="formState.pid"
        allow-clear
        show-search
        :filter-option="filterOption"
        :options="selectOptions"
      />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, reactive, UnwrapRef } from 'vue'

import { list } from '@/api/type'

import { TypeForm, typeRules, Type, Option } from './config'

export default defineComponent({
  setup() {
    const formRef: Ref<any> = ref()
    const formState: UnwrapRef<TypeForm> = reactive({
      pid: undefined,
      name: '',
    })
    const selectOptions = ref([])

    const filterOption = (inputValue: string, option: Option) => {
      return option.label.includes(inputValue)
    }

    const getType = () => {
      list().then(({ data }) => {
        selectOptions.value = data.map(({ id, name }: Type) => ({
          label: name,
          value: id,
        }))
      })
    }

    getType()

    return {
      formRef,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formState,
      typeRules,
      selectOptions,
      filterOption,
    }
  },
})
</script>
