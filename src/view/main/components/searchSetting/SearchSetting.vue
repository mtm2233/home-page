<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-06-27 20:03:30
 * @LastEditTime: 2021-08-21 22:54:11
 * @LastEditors: mTm
-->
<template>
  <div class="item">
    <div>网址下拉搜索</div>
    <a-switch :checked="searchWebsite" @change="searchWebsiteChange" />
  </div>
  <div class="item">
    <div>完全匹配搜索</div>
    <a-switch :checked="preciseSearch" @change="preciseSearchChange" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const searchWebsite = computed(() => store.state.searchWebsite)
    const preciseSearch = computed(() => store.state.preciseSearch)

    const searchWebsiteChange = (checked: boolean) => {
      changeState({
        key: 'searchWebsite',
        value: checked,
      })
    }

    const preciseSearchChange = (checked: boolean) => {
      changeState({
        key: 'preciseSearch',
        value: checked,
      })
    }

    const changeState = (kv: { key: string; value: any; dbSet?: boolean }) => {
      const { key, value, dbSet = false } = kv
      store.commit('changeState', {
        key,
        value,
        dbSet,
      })
    }

    const save = () => {
      changeState({
        key: 'searchWebsite',
        value: searchWebsite.value,
        dbSet: true,
      })
      changeState({
        key: 'preciseSearch',
        value: preciseSearch.value,
        dbSet: true,
      })
    }
    return {
      save,
      searchWebsite,
      preciseSearch,
      searchWebsiteChange,
      preciseSearchChange,
    }
  },
})
</script>
<style scoped lang="less">
.item {
  display: flex;
  align-items: center;
  padding: 5px 0;
  div {
    margin-right: 20px;
  }
}
</style>
