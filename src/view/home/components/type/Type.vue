<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-26 15:20:03
 * @LastEditTime: 2021-04-26 16:59:50
 * @LastEditors: mTm
-->
<template>
  <div class="type">
    <div class="type-box">
      <ATabs v-model:activeKey="activeKey">
        <ATabsPane v-for="v in typeList" :key="v.id" :tab="v.name" />
      </ATabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted } from 'vue'
import { list } from '@/api/type'

export default defineComponent({
  name: 'Type',
  setup() {
    const typeList: Ref<any[]> = ref([])
    const activeKey: Ref<number | null> = ref(null)

    const getTypeList = () => {
      list().then(({ data }) => {
        if (Array.isArray(data) && data.length) {
          activeKey.value = data[0].id
          typeList.value = data
        }
        console.log(data)
      })
    }

    onMounted(() => {
      getTypeList()
    })

    return {
      typeList,
      activeKey,
    }
  },
})
</script>
<style scoped lang="less">
.type {
  padding: 30px 20px;
  background: #f7f7f7;
  &-box {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    .ant-tabs-bar {
      border: none;
    }
    /deep/ .ant-tabs-ink-bar {
      display: none !important;
    }
  }
}
</style>
