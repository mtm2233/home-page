<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-26 15:16:09
 * @LastEditTime: 2021-05-18 10:02:27
 * @LastEditors: mTm
-->
<template>
  <div>
    <template v-for="item in website">
      <ARow
        v-if="verifyHide(`t${item.id}`)"
        :key="item.id"
        align="middle"
        class="website"
        :gutter="[15, 50]"
      >
        <ACol span="4" class="website-type">{{ item.name }}</ACol>
        <ACol span="20">
          <ARow class="website-list" :gutter="[15, 15]">
            <template v-for="v in item.children">
              <a-tooltip
                v-if="verifyHide(`w${v.id}`)"
                :key="v.id"
                :title="v.description"
                :mouse-enter-delay="0.5"
                :color="color"
              >
                <ACol
                  :xs="8"
                  :sm="6"
                  :lg="4"
                  :xl="4"
                  class="website-list-item"
                  @click="goWebsite(v)"
                >
                  {{ v.name }}
                </ACol>
              </a-tooltip>
            </template>
          </ARow>
        </ACol>
      </ARow>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref, inject, computed } from 'vue'
import { useStore } from 'vuex'

import { websiteByType } from '@/api/website'

export default defineComponent({
  props: {
    type: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const store = useStore()
    const website: Ref<any[]> = ref([])
    const verifyHide = inject<any>('verifyHide')

    const color = computed(
      () =>
        store.state['@primary-color']?.variables?.['@primary-color'] ||
        '#000000bf',
    )

    const getWebsiteByType = () => {
      if (props.type) {
        websiteByType(props.type).then(({ data }) => {
          if (Array.isArray(data) && data.length) {
            website.value = data
          }
        })
      }
    }

    onMounted(() => {
      getWebsiteByType()
    })

    const goWebsite = (v: any) => {
      if (v.url) {
        window.open(v.url)
      }
    }

    return {
      color,
      website,
      goWebsite,
      verifyHide,
    }
  },
})
</script>

<style scoped lang="less">
.website {
  &-type {
    color: #999;
  }
  &-list {
    &-item {
      cursor: pointer;
      transition: all 0.2s ease-in;
      &:hover {
        background: #e5e5e5;
        color: #333;
      }
    }
  }
}
</style>
