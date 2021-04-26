<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 20:38:02
 * @LastEditTime: 2021-04-25 20:49:51
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </ADrawer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AlignRightOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'Edit',
    components: {
        AlignRightOutlined,
    },
    setup() {
        const iconStyle = {
            fontSize: '30px',
        }

        // 控制抽屉
        const visible = ref(false)
        const onClose = () => {
            visible.value = false
        }
        const showEdit = () => {
            visible.value = true
        }
        return {
            iconStyle,
            visible,
            onClose,
            showEdit,
        }
    },
})
</script>

<style scoped lang="less"></style>
