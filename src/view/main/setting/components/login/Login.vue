<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-03 22:32:37
 * @LastEditTime: 2021-05-04 23:49:14
 * @LastEditors: mTm
-->
<template>
  <div>
    <a-button @click="login">登录</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const login = () => {
      const newPath = `https://sso.isdream.cn/user/login?url=${
        location.origin + location.pathname
      }`
      location.href = newPath
    }

    const save = () => {
      console.log(save)
    }
    return {
      login,
      save,
    }
  },
})
</script>
