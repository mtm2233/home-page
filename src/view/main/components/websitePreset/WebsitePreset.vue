<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-27 17:05:24
 * @LastEditTime: 2021-08-21 23:48:36
 * @LastEditors: mTm
-->
<template>
  <div>
    <Actions
      :id="selectedKeys[0]"
      v-model:editing="editing"
      :website-preset-cancel="websitePresetCancel"
    />
    <a-input-search
      v-model:value="searchValue"
      allow-clear
      style="margin-bottom: 8px"
      placeholder="搜索"
    />
    <a-tree
      v-model:checkedKeys="checkedKeys"
      v-model:selectedKeys="selectedKeys"
      :checkable="!editing"
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="editing ? gDataEditing : gData"
      @expand="onExpand"
    >
      <template #title="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
  reactive,
  toRefs,
} from 'vue'
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'
import { useStore } from 'vuex'

import { websiteByTypeAll } from '@/api/website'
import { changeKey, generateList, getParentKey } from './useData'

import Actions from '../actions/Actions.vue'

interface State {
  expandedKeys: string[]
  selectedKeys: string[]
  checkedKeys: string[]
  searchValue: string
  autoExpandParent: boolean
  gData: TreeDataItem[]
  gDataEditing: TreeDataItem[]
  gDataList: any[]
}
export default defineComponent({
  name: 'WebsitePreset',
  components: {
    Actions,
  },
  setup() {
    const store = useStore()
    const state = reactive<State>({
      expandedKeys: [],
      // 选中的项
      selectedKeys: [],
      checkedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      // 添加时
      gData: [],
      // 编辑时
      gDataEditing: [],
      // 搜索时
      gDataList: [],
    })

    const getData = () => {
      websiteByTypeAll().then(({ data }) => {
        state.gData = changeKey(data)
        state.gDataEditing = changeKey(data, true)
        state.gDataList = generateList(state.gData)
        nextTick(() => {
          const { typeWebsite } = store.state
          state.checkedKeys = typeWebsite
        })
      })
    }

    onMounted(() => {
      getData()
    })

    const onExpand = (keys: string[]) => {
      state.expandedKeys = keys
      state.autoExpandParent = false
    }

    // 监听搜索内容
    watch(
      () => state.searchValue,
      (value: string) => {
        if (value) {
          const expanded = state.gDataList
            .map((item: TreeDataItem) => {
              if ((item.title as string).indexOf(value) > -1) {
                return getParentKey(item.key as string, state.gData)
              }
              return null
            })
            .filter(
              (item: any, i: any, self: any) =>
                item && self.indexOf(item) === i,
            )
          state.expandedKeys = expanded as string[]
        } else {
          state.expandedKeys = []
        }
        state.searchValue = value
        state.autoExpandParent = true
      },
    )

    // 同步预设时，调整选中
    watch(
      () => store.state.typeWebsite,
      () => {
        state.checkedKeys = store.state.typeWebsite
      },
    )

    // 正在编辑
    const editing = ref(false)

    // 保存
    const save = () => {
      store.commit('changeState', {
        key: 'typeWebsite',
        value: state.checkedKeys,
        dbSet: true,
      })
    }

    const websitePresetCancel = () => {
      getData()
      state.selectedKeys = []
      state.checkedKeys = []
    }

    return {
      ...toRefs(state),
      onExpand,
      save,
      editing,
      websitePresetCancel,
    }
  },
})
</script>
