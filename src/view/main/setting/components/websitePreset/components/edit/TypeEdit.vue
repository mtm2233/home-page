<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-09 23:22:13
 * @LastEditTime: 2021-05-13 23:10:19
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
import {
  defineComponent,
  Ref,
  ref,
  reactive,
  UnwrapRef,
  inject,
  watch,
} from 'vue'

import { list, typeAdd } from '@/api/type'

import { TypeForm, typeRules, Type, Option } from './config'

export default defineComponent({
  props: {
    id: {
      type: String || undefined,
      default: undefined,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['cancel'],
  setup(props, context) {
    const message: any = inject('$message')

    const formRef: Ref<any> = ref()
    const formState: UnwrapRef<TypeForm> = reactive({
      pid: null,
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
        setPid()
      })
    }

    const getTypeInfo = () => {
      console.log(getTypeInfo)
    }

    const setPid = () => {
      const { id, isEdit } = props
      if (!isEdit && id && id.search('t') !== -1) {
        const numId = Number(id.replace('t', ''))
        formState.pid = selectOptions.value.find(
          (v: Option) => v.value === numId,
        )
          ? numId
          : null
      } else {
        formState.pid = null
      }
    }

    watch(
      () => props.id,
      () => {
        if (props.isEdit) {
          getTypeInfo()
        } else {
          setPid()
        }
      },
      { deep: true },
    )

    getType()

    const handleOk = () => {
      formRef.value.validate().then(() => {
        if (props.id) {
          console.log(1123)
        } else {
          typeAdd({
            ...formState,
            pid: formState.pid || null,
          }).then(res => {
            message.success(res.message)
            context.emit('cancel')
            cancel()
            getType()
          })
        }
      })
    }

    // const show = () => {
    //   if (props.id) {

    //   }
    // }

    const cancel = () => {
      formRef.value.resetFields()
      // setPid()
    }

    return {
      formRef,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formState,
      typeRules,
      selectOptions,
      filterOption,
      handleOk,
      // cancel,
      // show,
    }
  },
})
</script>
