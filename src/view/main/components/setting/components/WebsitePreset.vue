<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-27 17:05:24
 * @LastEditTime: 2021-04-27 21:55:58
 * @LastEditors: mTm
-->
<template>
    <div>
        <a-input-search
            v-model:value="searchValue"
            allow-clear
            style="margin-bottom: 8px"
            placeholder="搜索"
        />
        <a-tree
            v-model:checkedKeys="checkedKeys"
            checkable
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
import { defineComponent, onMounted, ref, watch } from 'vue'
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'

import { websiteByTypeAll } from '@/api/website'
import { changeKey, generateList, getParentKey } from './useWebsite'

export default defineComponent({
    name: 'WebsitePreset',
    setup() {
        const expandedKeys = ref<string[]>([])
        const checkedKeys = ref<string[]>([])
        const searchValue = ref<string>('')
        const autoExpandParent = ref<boolean>(true)
        const gData = ref<TreeDataItem[]>([])

        const getData = () => {
            websiteByTypeAll().then(({ data }) => {
                gData.value = changeKey(data)
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
                    (item: any, i: any, self: any) =>
                        item && self.indexOf(item) === i,
                )
            expandedKeys.value = expanded as string[]
            searchValue.value = value
            autoExpandParent.value = true
        })
        return {
            expandedKeys,
            checkedKeys,
            searchValue,
            autoExpandParent,
            gData,
            onExpand,
        }
    },
})
</script>
