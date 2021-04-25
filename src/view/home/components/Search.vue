<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 22:02:34
 * @LastEditTime: 2021-04-25 23:47:44
 * @LastEditors: mTm
-->
<template>
  <div class="search">
    <ATabs v-model:activeKey="activeKey">
      <ATabsPane v-for="v in searchs" :key="v.id" :tab="v.name" />
    </ATabs>
    <AInputSearch
      v-model:value="value"
      :placeholder="currentSearch.placeholder || currentSearch.name || '搜索'"
      enter-button="搜索"
      size="large"
      :allow-clear="true"
      @search="onSearch"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { list } from '@/api/search'

export default defineComponent({
  name: 'Search',
  setup() {
    // 初始化
    const activeKey = ref()
    const searchs = ref([])

    const getList = () => {
      list().then(({ data }) => {
        searchs.value = data || []
        if (Array.isArray(data) && data.length) {
          activeKey.value = data[0].id
        }
      })
    }
    onMounted(() => {
      getList()
    })

    // 搜索
    const value = ref()
    const onSearch = () => {
      if (value.value && currentSearch.value.website) {
        let { website, search_key, extra_key } = currentSearch.value
        if (extra_key) {
          window.open(`${website}?${search_key}=${value.value}&${extra_key}`)
        } else {
          window.open(`${website}?${search_key}=${value.value}`)
        }
      }
    }

    // 当前的搜索引擎
    const currentSearch = computed(
      () =>
        searchs.value.find((v: any) => v.id === activeKey.value) || {
          website: '',
          search_key: '',
          extra_key: '',
        },
    )

    return {
      activeKey,
      searchs,

      value,
      onSearch,
      currentSearch,
    }
  },
})
</script>
<style scoped>
.search {
  max-width: 800px;
  margin: 0 auto;
}
</style>
