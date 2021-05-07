<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-03 22:32:37
 * @LastEditTime: 2021-05-07 17:26:57
 * @LastEditors: mTm
-->
<template>
  <div v-if="!token">
    <a-button @click="login">登录</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const login = () => {
      const newPath = `https://sso.isdream.cn/user/login?url=${
        location.origin + location.pathname
      }`
      location.href = newPath
    }

    const store = useStore();
    const token = computed(() => store.state.token)

    const save = () => {
      console.log(save)
    }
    return {
      login,
      save,
      token,
    }
  },
})
</script>
