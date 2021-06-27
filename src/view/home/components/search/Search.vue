<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 22:02:34
 * @LastEditTime: 2021-06-27 21:54:38
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
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Search',
  setup() {
    const store = useStore()
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
      // 用户是否开启功能 && 存在网址 && 只有一个
      if (store.state.searchWebsite && website && website.count === 0) {
        window.open(website.url)
      } else if (currentSearch.value.website) {
        let { website, search_key, extra_key } = currentSearch.value
        let url: string | null = null
        // 精准搜索，开启
        if (store.state.preciseSearch) {
          url = `${website}?${search_key}="${value.value}"`
        } else {
          url = `${website}?${search_key}=${value.value}`
        }

        // 是否需要其他搜索字段
        if (extra_key) {
          window.open(`${url}&${extra_key}`)
        } else {
          window.open(url)
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
