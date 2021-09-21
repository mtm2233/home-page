<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-03 22:32:37
 * @LastEditTime: 2021-09-21 11:51:04
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
import config from '@/config'

import preset from './usePreset'

export default defineComponent({
  setup() {
    const login = () => {
      const newPath = `${config.baseUrl.sso}/login?url=${
        location.origin + location.pathname
      }`
      location.href = newPath
    }

    const store = useStore()
    const token = computed(() => store.state.token)

    const logout = () => {
      store.commit('setToken', null)
      const newPath = `${config.baseUrl.sso}/logout?url=${
        location.origin + location.pathname
      }`
      location.href = newPath
    }

    const save = () => {
      console.log(save)
    }

    // 预设
    const { savePreset, syncPreset } = preset.values

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
