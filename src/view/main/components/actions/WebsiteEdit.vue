<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-09 23:22:13
 * @LastEditTime: 2021-05-18 09:56:52
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
    <a-form-item label="介绍" name="description">
      <a-input v-model:value="formState.description" />
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
  computed,
} from 'vue'

import { tree } from '@/api/type'
import { websitAdd, websitInfo, websitEdit } from '@/api/website'

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
      type_id: undefined,
      name: '',
      url: '',
      description: null,
    })
    const selectTreeData: Ref<any> = ref([])

    const filterTreeNode = (inputValue: string, treeNode: any) => {
      return treeNode.props.label.includes(inputValue)
    }

    const getType = (): Promise<any> => {
      return tree().then(({ data }) => {
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

    getType().then(() => {
      init()
    })

    // t70 => 70
    const getNumId = computed(() => {
      const id = props.id
      return id ? Number(id.replace(/[tw]/g, '')) : null
    })

    // init type_id
    const setTypeId = () => {
      const { id, isEdit } = props
      if (!isEdit && id && id.search('t') !== -1) {
        const numId = Number(id.replace('t', ''))
        // 是否是二级分类
        formState.type_id = selectTreeData.value.find(
          (option: Option) => option.value === numId,
        )
          ? undefined
          : numId
      } else {
        formState.type_id = undefined
      }
    }

    // 编辑前，获取详细信息
    const getWebsiteInfo = () => {
      const { id, isEdit } = props
      const numId = getNumId.value
      if (isEdit && numId && id.search('w') !== -1) {
        websitInfo(numId).then(res => {
          const { url, type_id, name, description = null } = res.data
          formState.url = url
          formState.type_id = type_id
          formState.name = name
          formState.description = description
        })
      }
    }

    const init = () => {
      if (props.isEdit) {
        getWebsiteInfo()
      } else {
        formState.url = ''
        formState.name = ''
        formState.description = null
        setTypeId()
      }
    }

    const handleOk = () => {
      console.log(formState)
      formRef.value.validate().then(() => {
        const data = {
          ...formState,
          url: urlType.value + formState.url,
        }
        const numId = getNumId.value
        if (props.isEdit && numId) {
          websitEdit(numId, data).then(res => {
            context.emit('cancel')
            message.success(res.message)
            formRef.value.resetFields()
          })
        } else {
          websitAdd(data).then(res => {
            context.emit('cancel')
            message.success(res.message)
            formRef.value.resetFields()
          })
        }
      })
    }

    const cancel = () => {
      formRef.value.resetFields()
      getType()
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
      init,
    }
  },
})
</script>
