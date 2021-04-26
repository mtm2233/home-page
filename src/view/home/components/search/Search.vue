<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 22:02:34
 * @LastEditTime: 2021-04-26 17:34:06
 * @LastEditors: mTm
-->
<template>
    <div class="search">
        <ATabs v-model:activeKey="activeKey">
            <ATabsPane v-for="v in searchs" :key="v.id" :tab="v.name" />
        </ATabs>
        <AInputSearch
            ref="searchRef"
            v-model:value="value"
            autofocus="autofocus"
            :placeholder="
                currentSearch.placeholder || currentSearch.name || '搜索'
            "
            enter-button="搜索"
            size="large"
            :allow-clear="true"
            @search="onSearch"
        />
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    computed,
    Ref,
    ComputedRef,
} from 'vue'
import { list } from '@/api/search'

export default defineComponent({
    name: 'Search',
    setup() {
        // 初始化
        const activeKey: Ref<number | null> = ref(null)
        const searchs: Ref<any[]> = ref([])
        const searchRef: Ref<any | null> = ref(null)

        const getList = () => {
            list().then(({ data }) => {
                if (Array.isArray(data) && data.length) {
                    searchs.value = data
                    activeKey.value = data[0].id
                }
            })
        }

        const searchFocus = () => {
            if (searchRef.value) {
                searchRef.value.focus()
            }
        }

        onMounted(() => {
            getList()
            searchFocus()
        })

        // 搜索
        const value: Ref<string | null> = ref(null)
        const onSearch = () => {
            if (value.value && currentSearch.value.website) {
                let { website, search_key, extra_key } = currentSearch.value
                if (extra_key) {
                    window.open(
                        `${website}?${search_key}=${value.value}&${extra_key}`,
                    )
                } else {
                    window.open(`${website}?${search_key}=${value.value}`)
                }
            }
        }

        // 当前的搜索引擎
        const currentSearch: ComputedRef = computed(() => {
            searchFocus()
            return (
                searchs.value.find((v: any) => v.id === activeKey.value) || {}
            )
        })

        return {
            activeKey,
            searchs,
            searchRef,

            value,
            onSearch,
            currentSearch,
        }
    },
})
</script>
<style scoped>
.search {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 20px 80px 20px;
}
</style>
