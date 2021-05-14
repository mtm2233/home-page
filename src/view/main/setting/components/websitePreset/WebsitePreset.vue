<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-27 17:05:24
 * @LastEditTime: 2021-05-14 13:48:31
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
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'
import { useStore } from 'vuex'

import { websiteByTypeAll } from '@/api/website'
import { changeKey, generateList, getParentKey } from './useData'

import Actions from './components/Actions.vue'

export default defineComponent({
  name: 'WebsitePreset',
  components: {
    Actions,
  },
  setup() {
    const store = useStore()
    const expandedKeys = ref<string[]>([])
    // 选中的项
    const selectedKeys = ref<string[]>([])
    const checkedKeys = ref<string[]>([])
    const searchValue = ref<string>('')
    const autoExpandParent = ref<boolean>(true)
    const gData = ref<TreeDataItem[]>([])
    const gDataEditing = ref<TreeDataItem[]>([])

    const getData = () => {
      websiteByTypeAll().then(({ data }) => {
        gData.value = changeKey(data)
        gDataEditing.value = changeKey(data, true)
        nextTick(() => {
          const { typeWebsite } = store.state
          checkedKeys.value = typeWebsite
        })
      })
    }

    onMounted(() => {
      getData()
    })

    const onExpand = (keys: string[]) => {
      expandedKeys.value = keys
      autoExpandParent.value = false
    }

    watch(searchValue, value => {
      const expanded = generateList(gData.value)
        .map((item: TreeDataItem) => {
          if ((item.title as string).indexOf(value) > -1) {
            return getParentKey(item.key as string, gData.value)
          }
          return null
        })
        .filter(
          (item: any, i: any, self: any) => item && self.indexOf(item) === i,
        )
      expandedKeys.value = expanded as string[]
      searchValue.value = value
      autoExpandParent.value = true
    })

    // 正在编辑
    const editing = ref(false)

    // 保存
    const save = () => {
      store.commit('chageState', {
        key: 'typeWebsite',
        value: checkedKeys.value,
        dbSet: true,
      })
    }

    const websitePresetCancel = () => {
      getData()
      selectedKeys.value = []
      checkedKeys.value = []
    }

    return {
      expandedKeys,
      selectedKeys,
      checkedKeys,
      searchValue,
      autoExpandParent,
      gData,
      gDataEditing,
      onExpand,
      save,
      editing,
      websitePresetCancel,
    }
  },
})
</script>