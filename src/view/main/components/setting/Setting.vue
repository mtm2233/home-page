<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 20:38:02
 * @LastEditTime: 2021-04-27 22:31:58
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
        <ACollapse v-model:activeKey="activeKey" accordion>
            <ACollapsePanel key="1" header="常规设置"> 1232 </ACollapsePanel>
            <ACollapsePanel key="2" header="隐藏导航预设">
                <WebsitePreset :ref="setItemRef" />
            </ACollapsePanel>
        </ACollapse>
    </ADrawer>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { AlignRightOutlined } from '@ant-design/icons-vue'

import WebsitePreset from './components/WebsitePreset.vue'

export default defineComponent({
    name: 'Edit',
    components: {
        AlignRightOutlined,
        WebsitePreset,
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
                el.save && el.save()
            })
        }
        const showEdit = () => {
            visible.value = true
        }

        const activeKey: Ref<number | null> = ref(null)
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
