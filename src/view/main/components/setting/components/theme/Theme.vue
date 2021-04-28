<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-28 09:27:58
 * @LastEditTime: 2021-04-28 17:06:39
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
        // (window as any).less
        //     .modifyVars({
        //         '@primary-color': '#faad14',
        //     })
        //     .then(() => {
        //         // this.$_theme_updateClass(newTheme);
        //         console.log(123)
        //     })
        //     .catch(() => {
        //         // this.$message.error('主题更换失败！')
        //         console.log(1233)
        //     })
        // console.log(less)
        // less.modifyVars({
        //         '@primary-color': '#faad14',
        //     })
        // console.log(modifyVars);
        return {
            save,
        }
    },
})
</script>
