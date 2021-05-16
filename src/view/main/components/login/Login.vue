<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-03 22:32:37
 * @LastEditTime: 2021-05-16 23:38:00
 * @LastEditors: mTm
-->
<template>
  <div v-if="!token">
    <a-button @click="login">登录</a-button>
  </div>
  <div v-else>
    <a-space>
      <a-button @click="logout">退出登录</a-button>
      <a-button type="primary" @click="savePreset">保存预设</a-button>
      <a-button type="primary" @click="syncPreset">同步预设</a-button>
    </a-space>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import preset from './usePreset'

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
      const newPath = `https://sso.isdream.cn/user/logout?url=${
        location.origin + location.pathname
      }`
      location.href = newPath
    }

    const save = () => {
      console.log(save)
    }

    // 预设
    const { savePreset, syncPreset } = preset.values()

    return {
      login,
      save,
      token,
      logout,
      savePreset,
      syncPreset,
    }
  },
})
</script>
