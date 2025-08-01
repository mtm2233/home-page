<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-05-03 22:32:37
 * @LastEditTime: 2021-11-01 21:39:10
 * @LastEditors: mTm
-->
<template>
  <div v-if="!token">
    <a-button class="isdream-login" @click="oauthLoginTo">
      <img :src="FAVICON_URL" alt="" />
      主站账号登录
    </a-button>
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
import { FAVICON_URL, useCodeLogin } from 'isdream-oauth'

import preset from './usePreset'

export default defineComponent({
  setup() {
    const { oauthLoginTo } = useCodeLogin({
      client_id: import.meta.env.VITE_OAUTH_CLIENT_ID!,
      redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI!,
    })

    const store = useStore()
    const token = computed(() => store.state.token)

    const logout = () => {
      store.commit('setToken')
    }

    const save = () => {
      console.log(save)
    }

    // 预设
    const { savePreset, syncPreset } = preset.values

    return {
      save,
      token,
      logout,
      savePreset,
      syncPreset,

      FAVICON_URL,
      oauthLoginTo,
    }
  },
})
</script>
<style lang="less" scoped>
.isdream-login {
  margin-left: 0;
  img {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
}
</style>
