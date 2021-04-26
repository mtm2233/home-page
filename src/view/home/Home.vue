<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 22:02:34
 * @LastEditTime: 2021-04-26 23:21:07
 * @LastEditors: mTm
-->
<template>
    <Search />
    <Type />
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Search from './components/search/Search.vue'
import Type from './components/type/Type.vue'

import db from '@/libs/db'

export default defineComponent({
    name: 'Home',
    components: {
        Search,
        Type,
    },
    setup() {
        onMounted(() => {
            // db.set({
            //     key: 'a',
            //     value: {
            //         name: '张三123',
            //     },
            //     expires: 2 * 60 * 1000,
            // })
            // console.log(db.get('a'))
        })
        return {}
    },
})
</script>
