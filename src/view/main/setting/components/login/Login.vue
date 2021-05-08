<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-03 22:32:37
 * @LastEditTime: 2021-05-07 22:13:07
 * @LastEditors: mTm
-->
<template>
  <div v-if="!token">
    <a-button @click="login">登录</a-button>
  </div>
  <div v-else>
    <a-button @click="logout">退出登录</a-button>
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

    const store = useStore()
    const token = computed(() => store.state.token)

    const logout = () => {
      store.commit('setToken', null)
      // const newPath = `https://sso.isdream.cn/user/logout?url=${
      //   location.origin + location.pathname
      // }`
      // location.href = newPath
    }

    const save = () => {
      console.log(save)
    }
    return {
      login,
      save,
      token,
      logout,
    }
  },
})
</script>
