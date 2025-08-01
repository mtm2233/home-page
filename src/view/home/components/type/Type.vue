<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-26 15:20:03
 * @LastEditTime: 2021-05-17 13:26:09
 * @LastEditors: mTm
-->
<template>
  <div class="type">
    <div class="type-box">
      <ATabs v-model:activeKey="activeKey" class="type-box-list">
        <template v-for="v in typeList">
          <a-tab-pane v-if="verifyHide(`t${v.id}`)" :key="v.id" :tab="v.name" />
        </template>
      </ATabs>
      <template v-for="v in typeList">
        <Website
          v-if="activateList.includes(v.id)"
          v-show="v.id === activeKey"
          :key="v.id"
          :type="v.id"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  Ref,
  ref,
  onMounted,
  watch,
  inject,
  computed,
  ComputedRef,
} from 'vue'
import { useStore } from 'vuex'

import { list } from '@/api/type'
import Website from '../website/Website.vue'

export default defineComponent({
  name: 'Type',
  components: {
    Website,
  },
  setup() {
    const store = useStore()
    const typeList: Ref<any[]> = ref([])
    const activeKey: Ref<number | null> = ref(null)
    const verifyHide = inject<any>('verifyHide')

    // 第一项
    const typeFirstId: ComputedRef<number | null> = computed(() => {
      const hiddleTypeId = store.state.typeWebsite
        .filter((typeId: string) => typeId.includes('t'))
        .map((typeId: string) => Number(typeId.replace(/[tw]/g, '')))
      const firstType = typeList.value.find(
        (type: any) => !hiddleTypeId.includes(type.id),
      )
      return firstType ? firstType.id : null
    })

    // 监听
    watch(
      () => typeFirstId.value,
      () => (activeKey.value = typeFirstId.value),
    )

    const getTypeList = () => {
      list().then(({ data }) => {
        if (Array.isArray(data) && data.length) {
          typeList.value = data
          activeKey.value = typeFirstId.value
        }
      })
    }

    const activateList: Ref<any[]> = ref([])
    watch(
      activeKey,
      val => {
        activateList.value = [...new Set([...activateList.value, val])]
      },
      { deep: true },
    )

    onMounted(() => {
      getTypeList()
    })

    return {
      typeList,
      activeKey,
      activateList,
      verifyHide,
    }
  },
})
</script>
<style scoped lang="less">
.type {
  padding: 40px 20px;
  background: #f7f7f7;
  &-box {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    &-list {
      padding-bottom: 20px;
      :deep(.ant-tabs-tab) {
        transition: all 0.2s ease-in;
        &:hover {
          background: #e5e5e5;
          color: #333;
        }
      }
      :deep(.ant-tabs-tab-active) {
        background: #e5e5e5;
        color: #333;
      }
    }
    :deep(.ant-tabs-bar) {
      border: none;
    }
    :deep(.ant-tabs-ink-bar) {
      display: none !important;
    }
  }
}
</style>
