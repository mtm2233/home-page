<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-28 09:27:58
 * @LastEditTime: 2021-08-21 22:59:35
 * @LastEditors: mTm
-->
<template>
  <ul class="setting-theme v-to-zero">
    <ATooltip v-for="item of bgThemeList" :key="item.name" :title="item.text">
      <li
        :style="{
          backgroundColor: item.variables['@primary-bg'],
        }"
        @click="changeTheme(item)"
      >
        <CheckOutlined
          v-show="theme && theme.name === item.name"
          class="check-icon"
        />
      </li>
    </ATooltip>
  </ul>
</template>
<script lang="ts">
import { defineComponent, inject, computed } from 'vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'

import { bgThemeList } from '@/libs/theme'

export default defineComponent({
  name: 'Theme',
  components: {
    CheckOutlined,
  },
  setup() {
    const store = useStore()
    const theme = computed(() => store.state['@primary-bg'])
    const $message: any = inject('$message')

    const changeTheme = (item: any) => {
      let variables = {
        ...item.variables,
      }
      const primary = store.state['@primary-color']
      if (primary && primary.variables) {
        variables = Object.assign(variables, primary.variables)
      }
      ;(window as any).less
        .modifyVars(variables)
        .then(() => {
          store.commit('changeState', {
            key: '@primary-bg',
            value: item,
          })
        })
        .catch(() => {
          $message.warning('定制主题失败~')
        })
    }

    const save = () => {
      store.commit('changeState', {
        key: '@primary-bg',
        value: theme.value,
        dbSet: true,
      })
    }

    return {
      bgThemeList,
      changeTheme,
      theme,
      save,
    }
  },
})
</script>
<style lang="less" scoped>
.setting {
  &-svg {
    width: 68px;
    height: 56px;
  }

  &-theme {
    list-style: none;

    > li {
      display: inline-block;
      width: 28px;
      height: 28px;
      border-radius: 4px;
      vertical-align: middle;
      text-align: center;
      cursor: pointer;
      margin: 10px;
    }

    // li + li {
    //     margin-left: 10px;
    // }

    .check-icon {
      vertical-align: middle;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>
