<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 20:38:02
 * @LastEditTime: 2021-06-27 20:06:53
 * @LastEditors: mTm
-->
<template>
  <AlignRightOutlined :style="iconStyle" @click="showEdit" />
  <ADrawer
    title="设置"
    placement="right"
    :visible="visible"
    width="auto"
    @close="onClose"
  >
    <!-- accordion 最多只能展开一个 -->
    <ACollapse v-model:activeKey="activeKey">
      <ACollapsePanel key="1" header="定制主题">
        <Theme :ref="setItemRef" />
      </ACollapsePanel>
      <ACollapsePanel key="2" header="背景偏好">
        <BgTheme :ref="setItemRef" />
      </ACollapsePanel>
      <ACollapsePanel key="3" header="搜索配置">
        <SearchSetting :ref="setItemRef" />
      </ACollapsePanel>
      <ACollapsePanel key="4" header="隐藏导航预设">
        <WebsitePreset :ref="setItemRef" />
      </ACollapsePanel>
      <ACollapsePanel key="5" header="云端保存">
        <Login :ref="setItemRef" />
      </ACollapsePanel>
    </ACollapse>
  </ADrawer>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { AlignRightOutlined } from '@ant-design/icons-vue'

import WebsitePreset from './websitePreset/WebsitePreset.vue'
import Theme from './theme/Theme.vue'
import BgTheme from './bgTheme/BgTheme.vue'
import Login from './login/Login.vue'
import SearchSetting from './searchSetting/SearchSetting.vue'

export default defineComponent({
  name: 'Edit',
  components: {
    AlignRightOutlined,
    WebsitePreset,
    Theme,
    BgTheme,
    Login,
    SearchSetting,
  },
  setup() {
    const iconStyle = {
      fontSize: '30px',
    }

    // ref对象
    let itemRefs: any[] = []

    // 收集ref对象
    const setItemRef = (el: any) => {
      itemRefs = [...new Set([...itemRefs, el])]
    }

    // 控制抽屉
    const visible: Ref<boolean> = ref(false)
    const onClose = () => {
      visible.value = false
      // 关闭时，触发保持
      itemRefs.forEach((el: any) => {
        el && el.save && el.save()
      })
    }
    const showEdit = () => {
      visible.value = true
    }

    const activeKey = ref(['1'])
    return {
      iconStyle,
      visible,
      onClose,
      showEdit,
      activeKey,
      setItemRef,
    }
  },
})
</script>

<style scoped lang="less"></style>
