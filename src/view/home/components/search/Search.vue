<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 22:02:34
 * @LastEditTime: 2021-06-22 22:35:59
 * @LastEditors: mTm
-->
<template>
  <div class="search">
    <ATabs v-model:activeKey="activeKey">
      <a-tabs-pane v-for="v in searchs" :key="v.id" :tab="v.name" />
    </ATabs>
    <AInputSearch
      ref="searchRef"
      v-model:value="value"
      autofocus="autofocus"
      :placeholder="currentSearch.placeholder || currentSearch.name || '搜索'"
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
  inject,
} from 'vue'
import { list } from '@/api/search'
import { websiteByTypeAll } from '@/api/website'

export default defineComponent({
  name: 'Search',
  setup() {
    // 初始化
    const activeKey: Ref<number | null> = ref(null)
    const searchs: Ref<any[]> = ref([])
    const searchRef: Ref<any | null> = ref(null)
    const verifyHide = inject<any>('verifyHide')

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

    const websiteMap = new Map()
    // 获取website
    const getWebSite = () => {
      websiteByTypeAll().then((res: any) => {
        setWebsiteMap(res.data)
      })
    }

    const setWebsiteMap = (data: any) => {
      if (!data) {
        return
      }
      const { url, id } = data
      let { name } = data
      if (Array.isArray(data)) {
        data.forEach(v => {
          setWebsiteMap(v)
          v.children && setWebsiteMap(v.children)
        })
      } else if (url && verifyHide(`w${id}`)) {
        name = name.toLowerCase()
        const result = websiteMap.get(name)
        if (result) {
          result.count++
          websiteMap.set(name, result)
        } else {
          websiteMap.set(name, { url, count: 0 })
        }
      }
    }

    onMounted(() => {
      getList()
      searchFocus()
      getWebSite()
    })

    // 搜索
    const value: Ref<string | null> = ref(null)
    const onSearch = () => {
      if (!value.value) {
        return
      }
      const website = websiteMap.get(value.value.toLowerCase())
      if (website && website.count === 0) {
        window.open(website.url)
      } else if (currentSearch.value.website) {
        let { website, search_key, extra_key } = currentSearch.value
        if (extra_key) {
          window.open(`${website}?${search_key}="${value.value}"&${extra_key}`)
        } else {
          window.open(`${website}?${search_key}="${value.value}"`)
        }
      }
    }

    // 当前的搜索引擎
    const currentSearch: ComputedRef = computed(() => {
      searchFocus()
      return searchs.value.find((v: any) => v.id === activeKey.value) || {}
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
