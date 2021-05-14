<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-09 23:22:13
 * @LastEditTime: 2021-05-14 00:27:25
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
        :disabled="isEdit"
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
  nextTick,
  computed,
} from 'vue'

import { list, typeAdd, typeInfo, typeEdit } from '@/api/type'

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

    const getType = (): Promise<any> => {
      return list().then(({ data }) => {
        selectOptions.value = data.map(({ id, name }: Type) => ({
          label: name,
          value: id,
        }))
      })
    }

    // t70 => 70
    const getNumId = computed(() => {
      const id = props.id
      return id ? Number(id.replace('t', '')) : null
    })

    // 编辑 init
    const getTypeInfo = () => {
      const numId = getNumId.value
      numId &&
        typeInfo(numId).then((res: any) => {
          const { pid, name } = res.data
          formState.pid = pid
          formState.name = name
        })
    }

    // 添加 init
    const setPid = () => {
      const { id, isEdit } = props
      if (!isEdit && id && id.search('t') !== -1) {
        const numId = getNumId.value
        formState.pid = selectOptions.value.find(
          (v: Option) => v.value === numId,
        )
          ? numId
          : null
      } else {
        formState.pid = null
      }
    }

    const init = () => {
      if (props.isEdit) {
        getTypeInfo()
      } else {
        formState.name = ''
        setPid()
      }
    }

    getType().then(() => {
      nextTick(() => {
        init()
      })
    })

    const handleOk = () => {
      formRef.value.validate().then(() => {
        const data = {
          ...formState,
          pid: formState.pid || null,
        }
        if (props.id) {
          const numId = getNumId.value
          numId &&
            typeEdit(numId, data).then(res => {
              message.success(res.message)
              context.emit('cancel')
              cancel()
              getType()
            })
        } else {
          typeAdd(data).then(res => {
            message.success(res.message)
            context.emit('cancel')
            cancel()
            getType()
            setPid()
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
      init,
    }
  },
})
</script>
