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
      <a-tab-pane v-for="v in searchs" :key="v.id" :tab="v.name" />
    </ATabs>

    <AInputSearch
      v-if="!searchWebsite"
      v-model:value="value"
      :placeholder="currentSearch.placeholder || currentSearch.name || '搜索'"
      enter-button="搜索"
      size="large"
      :allow-clear="true"
      @search="onSearch"
    />
    <a-dropdown v-else :visible="visible">
      <AInputSearch
        v-model:value="value"
        :placeholder="currentSearch.placeholder || currentSearch.name || '搜索'"
        enter-button="搜索"
        size="large"
        :allow-clear="true"
        @search="onSearch"
        @change="keywordChange"
        @focus="visible = true"
        @blur="visible = false"
      />
      <template #overlay>
        <a-menu style="max-height: 240px; overflow-y: auto">
          <div
            v-for="item in websiteDataSearch"
            v-show="item.show"
            :key="item.id"
          >
            <a-menu-item>
              <div class="website-item" @click="goWebsite(item)">
                <div v-if="item.nameSearch">
                  {{ item.nameSearch[0]
                  }}<span class="primary-color"> {{ item.nameSearch[1] }} </span
                  >{{ item.nameSearch[2] }}
                </div>
                <div v-else>{{ item.name }}</div>

                <div v-if="item.descriptionSearch">
                  {{ item.descriptionSearch[0]
                  }}<span class="primary-color">
                    {{ item.descriptionSearch[1] }} </span
                  >{{ item.descriptionSearch[2] }}
                </div>
                <div v-else>{{ item.description }}</div>
              </div>
            </a-menu-item>
          </div>
        </a-menu>
      </template>
    </a-dropdown>
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
import { throttle } from 'lodash-unified'

interface State {
  activeKey: number | null
  searchs: any[]
  value: string | null
}
export default defineComponent({
  name: 'Search',
  setup() {
    const store = useStore()
    const searchWebsite = computed(() => store.state.searchWebsite)
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

    const visible = ref(false)

    const keyword = ref('')
    const keywordChange = throttle(() => {
      keyword.value = state.value || ''
    }, 300)

    // 搜索引擎列表
    const getList = () => {
      list().then(({ data }) => {
        if (Array.isArray(data) && data.length) {
          state.searchs = data
          state.activeKey = data[0].id
        }
      })
    }

    // 网址
    const websiteData = ref<any[]>([])
    const websiteDataSearch = computed(() => {
      const keywordLower = keyword.value.trim().toLowerCase()
      const keywordLen = keyword.value.length
      const data: any[] = []

      websiteData.value.forEach(item => {
        const { name, nameLower, description, descriptionLower } = item
        const val = {
          ...item,
        }

        let index = nameLower.indexOf(keywordLower)
        if (index !== -1) {
          val.nameSearch = [
            name.substring(0, index),
            name.substring(index, index + keywordLen),
            name.substring(index + keywordLen),
          ]
        }

        index = descriptionLower.indexOf(keywordLower)
        if (index !== -1) {
          val.descriptionSearch = [
            description.substring(0, index),
            description.substring(index, index + keywordLen),
            description.substring(index + keywordLen),
          ]
        }

        val.show = val.nameSearch || val.descriptionSearch
        data.push(val)
      })
      return data
    })

    // 获取website
    const getWebSite = () => {
      websiteByTypeAll().then((res: any) => {
        websiteData.value = getWebsiteData(res.data)
      })
    }

    const getWebsiteData = (data: any, list: any[] = []) => {
      if (!data) {
        return list
      }
      const { url, id } = data
      if (Array.isArray(data) && data.length) {
        data.forEach(v => {
          getWebsiteData(v, list)
          v.children && getWebsiteData(v.children, list)
        })
        // 网址且没有被隐藏
      } else if (url && verifyHide(`w${id}`)) {
        list.push({
          ...data,
          description: data.description || '',
          nameLower: data.name.toLowerCase(),
          descriptionLower: data.description
            ? data.description.toLowerCase()
            : '',
        })
      }

      return list
    }

    // 隐藏网址更改，重置map
    watch(
      () => store.state.typeWebsite,
      typeWebsite => {
        websiteData.value = getWebsiteData(typeWebsite)
      },
    )

    onMounted(() => {
      getList()
      getWebSite()
    })

    // 搜索
    const onSearch = () => {
      if (!state.value) {
        return
      }
      if (currentSearch.value.website) {
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
      return state.searchs.find((v: any) => v.id === state.activeKey) || {}
    })

    const goWebsite = (v: any) => {
      if (v.url) {
        window.open(v.url)
      }
    }

    return {
      ...toRefs(state),
      searchWebsite,
      visible,
      keyword,
      websiteDataSearch,
      keywordChange,
      websiteData,
      currentSearch,
      onSearch,
      goWebsite,
    }
  },
})
</script>
<style lang="less" scoped>
.search {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px 80px 20px;
}

.website-item {
  display: flex;
  align-items: center;
  div {
    &:nth-child(1) {
      flex-shrink: 0;
      margin-right: 10px;
    }
    &:nth-child(2) {
      flex: 1;
      min-width: 0;
      width: 200px;
      font-size: 12px;
      color: #999999;
      word-break: break-all;
      white-space: normal;
    }
  }
}
</style>
