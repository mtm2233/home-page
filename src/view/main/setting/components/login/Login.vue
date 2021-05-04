<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-03 22:32:37
 * @LastEditTime: 2021-05-04 17:45:56
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
      window.open(
        `https://sso.isdream.cn/login?url=${
          location.origin + location.pathname
        }`,
      )
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
