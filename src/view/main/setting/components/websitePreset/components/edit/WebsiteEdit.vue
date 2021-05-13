<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-09 23:22:13
 * @LastEditTime: 2021-05-13 23:09:50
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
    <a-form-item label="所属分类" name="type_id">
      <a-tree-select
        v-model:value="formState.type_id"
        allow-clear
        show-search
        :tree-data="selectTreeData"
        :filter-tree-node="filterTreeNode"
      />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="网址" name="url">
      <a-input v-model:value="formState.url">
        <template #addonBefore>
          <a-select v-model:value="urlType" style="width: 90px">
            <a-select-option value="http://">http://</a-select-option>
            <a-select-option value="https://">https://</a-select-option>
          </a-select>
        </template>
      </a-input>
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

import { tree } from '@/api/type'
import { websitAdd } from '@/api/website'

import { WebsiteForm, websiteRules, Type, Option } from './config'

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
    const urlType = ref('https://')
    const formState: UnwrapRef<WebsiteForm> = reactive({
      type_id: null,
      name: '',
      url: '',
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
        setTypeId()
      })
    }

    getType()

    // 初始化type_id
    const setTypeId = () => {
      const { id, isEdit } = props
      if (!isEdit && id && id.search('t') !== -1) {
        const numId = Number(id.replace('t', ''))
        // 是否是二级分类
        formState.type_id = selectTreeData.value.find(
          (option: Option) => option.value === numId,
        )
          ? null
          : numId
      } else {
        formState.type_id = null
      }
    }

    // 编辑前，获取详细信息
    const getWebsiteInfo = () => {
      console.log('getWebsiteInfo')
    }

    watch(
      () => props.id,
      () => {
        if (props.isEdit) {
          getWebsiteInfo()
        } else {
          setTypeId()
        }
      },
      { deep: true },
    )

    const handleOk = () => {
      formRef.value.validate().then(() => {
        websitAdd({
          ...formState,
          url: urlType.value + formState.url,
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
      urlType,
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
