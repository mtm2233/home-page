<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 20:38:02
 * @LastEditTime: 2021-04-28 23:17:20
 * @LastEditors: mTm
-->
<template>
    <AlignRightOutlined :style="iconStyle" @click="showEdit" />
    <ADrawer
        title="设置"
        placement="right"
        :visible="visible"
        :width="500"
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
            <ACollapsePanel key="3" header="隐藏导航预设">
                <WebsitePreset :ref="setItemRef" />
            </ACollapsePanel>
        </ACollapse>
    </ADrawer>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { AlignRightOutlined } from '@ant-design/icons-vue'

import WebsitePreset from './components/websitePreset/WebsitePreset.vue'
import Theme from './components/theme/Theme.vue'
import BgTheme from './components/bgTheme/BgTheme.vue'

export default defineComponent({
    name: 'Edit',
    components: {
        AlignRightOutlined,
        WebsitePreset,
        Theme,
        BgTheme,
    },
    setup() {
        const iconStyle = {
            fontSize: '30px',
        }

        let itemRefs: any[] = []

        const setItemRef = (el: any) => {
            itemRefs = [...new Set([...itemRefs, el])]
        }

        // 控制抽屉
        const visible: Ref<boolean> = ref(false)
        const onClose = () => {
            visible.value = false
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
