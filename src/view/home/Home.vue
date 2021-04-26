<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 22:02:34
 * @LastEditTime: 2021-04-26 15:30:07
 * @LastEditors: mTm
-->
<template>
    <Search />
    <Type />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Search from './components/search/Search.vue'
import Type from './components/type/Type.vue'

export default defineComponent({
    name: 'Home',
    components: {
        Search,
        Type,
    },
    setup() {
        return {}
    },
})
</script>
