<template>
    <div>
        <a-input-search
            v-model:value="searchValue"
            style="margin-bottom: 8px"
            placeholder="搜索"
        />
        <a-tree
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :tree-data="gData"
            @expand="onExpand"
        >
            <template #title="{ title }">
                <span v-if="title.indexOf(searchValue) > -1">
                    {{ title.substr(0, title.indexOf(searchValue)) }}
                    <span style="color: #f50">{{ searchValue }}</span>
                    {{
                        title.substr(
                            title.indexOf(searchValue) + searchValue.length,
                        )
                    }}
                </span>
                <span v-else>{{ title }}</span>
            </template>
        </a-tree>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'

import { genData, dataList, getParentKey } from './units'

export default defineComponent({
    name: 'WebsitePreset',
    setup() {
        const expandedKeys = ref<string[]>([])
        const searchValue = ref<string>('')
        const autoExpandParent = ref<boolean>(true)
        const gData = ref<TreeDataItem[]>(genData)

        const onExpand = (keys: string[]) => {
            expandedKeys.value = keys
            autoExpandParent.value = false
        }

        watch(searchValue, value => {
            const expanded = dataList
                .map((item: TreeDataItem) => {
                    if ((item.title as string).indexOf(value) > -1) {
                        return getParentKey(item.key as string, gData.value)
                    }
                    return null
                })
                .filter((item, i, self) => item && self.indexOf(item) === i)
            expandedKeys.value = expanded as string[]
            searchValue.value = value
            autoExpandParent.value = true
        })
        console.log('dataList', dataList)
        console.log('gData', gData.value)
        return {
            expandedKeys,
            searchValue,
            autoExpandParent,
            gData,
            onExpand,
        }
    },
})
</script>
