/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-15 21:06:44
 * @LastEditTime: 2021-08-21 23:49:14
 * @LastEditors: mTm
 */
// import db from '@/libs/db'
import { message } from 'ant-design-vue'
import { store } from '@/store'
import {
  typeSet,
  typeGet,
  websiteSet,
  websiteGet,
  themeGet,
  themeSet,
} from '@/api/preset'

interface PresetTheme {
  primaryColor: any
  primaryBg: any
  typeWebsite: any
  searchWebsite: boolean
  preciseSearch: boolean
}

class Preset {
  private primaryColor = ''
  private primaryBg = ''
  private searchWebsite = true
  private preciseSearch = true
  private type: number[] = []
  private website: number[] = []

  // constructor() {
  //   this.init()
  // }

  private setType() {
    return typeSet({ typeIds: this.type })
  }
  private setWebsite() {
    return websiteSet({ websiteIds: this.website })
  }
  private setTheme() {
    return themeSet({
      primary_color: this.primaryColor,
      primary_bg: this.primaryBg,
      search_website: this.searchWebsite,
      precise_search: this.preciseSearch,
    })
  }

  private getType() {
    return typeGet().then(res => res.data.map((typeId: number) => `t${typeId}`))
  }
  private getWebsite() {
    return websiteGet().then(res =>
      res.data.map((typeId: number) => `w${typeId}`),
    )
  }
  private getTheme() {
    return themeGet().then(res => res.data)
  }

  private removeWT(val: string) {
    return Number(val.replace(/[tw]/g, ''))
  }

  // 从vuex获取最新的值
  private init = () => {
    // theme
    this.primaryColor = JSON.stringify(store.state['@primary-color'])
    this.primaryBg = JSON.stringify(store.state['@primary-bg'])
    this.searchWebsite = store.state.searchWebsite
    this.preciseSearch = store.state.preciseSearch
    // website
    const typeWebsite = store.state.typeWebsite
    this.type = typeWebsite
      .filter((v: string) => v.includes('t'))
      .map((v: string) => this.removeWT(v))
    this.website = typeWebsite
      .filter((v: string) => v.includes('w'))
      .map((v: string) => this.removeWT(v))
  }

  // 保存样式到vuex localstorage
  private setPreset = (preset: PresetTheme) => {
    const { primaryColor, primaryBg } = preset

    // 生产less配置
    const variables = Object.assign(
      {},
      primaryColor.variables,
      primaryBg.variables,
    )

    // 保存到vuex
    const keys: string[] = ['typeWebsite', 'searchWebsite', 'preciseSearch']
    keys.forEach((key: string) => {
      console.log(key, (preset as any)[key])
      store.commit('changeState', {
        key,
        value: (preset as any)[key],
        dbSet: true,
      })
    })
    // 设置theme
    ;(window as any).less
      .modifyVars(variables)
      .then(() => {
        store.commit('changeState', {
          key: '@primary-color',
          value: primaryColor,
          dbSet: true,
        })
        store.commit('changeState', {
          key: '@primary-bg',
          value: primaryBg,
          dbSet: true,
        })
      })
      .catch(() => {
        message.warning('定制主题失败~')
      })
  }

  // 保存预设
  private savePreset = () => {
    this.init()
    Promise.all([this.setType(), this.setWebsite(), this.setTheme()])
      .then(() => {
        message.success('保存预设成功')
      })
      .catch(() => {
        message.error('保存预设失败~')
      })
  }
  // 同步预设
  private syncPreset = () => {
    Promise.all([this.getType(), this.getWebsite(), this.getTheme()])
      .then((preset: any) => {
        // 默认值
        const [type = [], Website = [], theme = {}] = preset
        // 别名
        const {
          primary_color: primaryColor,
          primary_bg: primaryBg,
          search_website: searchWebsite,
          precise_search: preciseSearch,
        } = theme
        // 保存样式到vuex localstorage
        this.setPreset({
          primaryColor: primaryColor && JSON.parse(primaryColor),
          primaryBg: primaryBg && JSON.parse(primaryBg),
          typeWebsite: [...type, ...Website],
          searchWebsite,
          preciseSearch,
        })
        message.success('同步预设成功')
      })
      .catch(() => {
        message.error('同步预设失败~')
      })
  }
  // 暴露给.vue
  public get values() {
    const { savePreset, syncPreset } = this
    return {
      savePreset,
      syncPreset,
    }
  }
}

export default new Preset()
