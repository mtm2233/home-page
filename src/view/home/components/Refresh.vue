<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-25 18:23:15
 * @LastEditTime: 2021-04-25 20:53:51
 * @LastEditors: mTm
-->
<template>
  <ATypographyTitle @click="reload">R</ATypographyTitle>
</template>
<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const reload = () => {
      router.push({
        name: 'Home',
      })
    }
    return {
      reload,
    }
  },
})
</script>

<style scoped>
.ant-typography {
  cursor: pointer;
}
</style>
