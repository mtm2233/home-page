<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 22:02:34
 * @LastEditTime: 2021-08-21 23:51:06
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
  watch,
  reactive,
  toRefs,
} from 'vue'
import { list } from '@/api/search'
import { websiteByTypeAll } from '@/api/website'
import { useStore } from 'vuex'

interface State {
  activeKey: number | null
  searchs: any[]
  value: string | null
}
export default defineComponent({
  name: 'Search',
  setup() {
    const store = useStore()
    // 校验是否被隐藏
    const verifyHide = inject<any>('verifyHide')
    // 初始化
    const state = reactive<State>({
      // 默认的搜索引擎key
      activeKey: null,
      // 搜索引擎
      searchs: [],
      // input 内容
      value: null,
    })

    // 搜索引擎列表
    const getList = () => {
      list().then(({ data }) => {
        if (Array.isArray(data) && data.length) {
          state.searchs = data
          state.activeKey = data[0].id
        }
      })
    }

    // input 输入框
    const searchRef: Ref<any | null> = ref(null)
    // 获得焦点
    const searchFocus = () => {
      if (searchRef.value) {
        searchRef.value.focus()
      }
    }

    // 网址、分类
    let typeWebsite: any[] = []
    let websiteMap = new Map()
    // 获取website
    const getWebSite = () => {
      websiteByTypeAll().then((res: any) => {
        typeWebsite = res.data
        setWebsiteMap(typeWebsite)
      })
    }

    // 设置搜索的网址
    const setWebsiteMap = (data: any) => {
      if (!data) {
        return
      }
      const { url, id } = data
      let { name } = data
      if (Array.isArray(data) && data.length) {
        data.forEach(v => {
          setWebsiteMap(v)
          v.children && setWebsiteMap(v.children)
        })
        // 网址且没有被隐藏
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
    // 隐藏网址更改，重置map
    watch(
      () => store.state.typeWebsite,
      () => {
        websiteMap = new Map()
        setWebsiteMap(typeWebsite)
      },
    )

    onMounted(() => {
      getList()
      searchFocus()
      getWebSite()
    })

    // 搜索
    const onSearch = () => {
      if (!state.value) {
        return
      }
      const website = websiteMap.get(state.value.toLowerCase())
      // 用户是否开启功能 && 存在网址 && 只有一个
      if (store.state.searchWebsite && website && website.count === 0) {
        window.open(website.url)
      } else if (currentSearch.value.website) {
        let { website, search_key, extra_key } = currentSearch.value
        let url: string | null = null
        // 精准搜索，开启
        if (store.state.preciseSearch) {
          url = `${website}?${search_key}="${state.value}"`
        } else {
          url = `${website}?${search_key}=${state.value}`
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
      return state.searchs.find((v: any) => v.id === state.activeKey) || {}
    })

    return {
      ...toRefs(state),
      searchRef,
      currentSearch,
      onSearch,
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
