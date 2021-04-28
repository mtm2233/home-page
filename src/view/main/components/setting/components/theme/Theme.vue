<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-28 09:27:58
 * @LastEditTime: 2021-04-28 18:34:13
 * @LastEditors: mTm
-->
<template>
    <div>theme</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Theme',
    setup() {
        const save = () => {
            console.log('save')
        }
        ;(window as any).less
            .modifyVars({
                'primary-color': 'blue',
            })
            .then(() => {
                console.log('成功')
            })
            .catch(() => {
                console.log('错误')
            })
        return {
            save,
        }
    },
})
</script>
