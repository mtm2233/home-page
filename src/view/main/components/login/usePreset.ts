/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-15 21:06:44
 * @LastEditTime: 2021-05-16 23:30:58
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
}

class Preset {
  private primaryColor = ''
  private primaryBg = ''
  private type: number[] = []
  private website: number[] = []

  // constructor() {
  //   this.init()
  // }

  setType() {
    return typeSet({ typeIds: this.type })
  }
  setWebsite() {
    return websiteSet({ websiteIds: this.website })
  }
  setTheme() {
    return themeSet({
      primary_color: this.primaryColor,
      primary_bg: this.primaryBg,
    })
  }

  getType() {
    return typeGet().then(res => res.data.map((typeId: number) => `t${typeId}`))
  }
  getWebsite() {
    return websiteGet().then(res =>
      res.data.map((typeId: number) => `w${typeId}`),
    )
  }
  getTheme() {
    return themeGet().then(res => res.data)
  }

  removeWT(val: string) {
    return Number(val.replace(/[tw]/g, ''))
  }

  private init = () => {
    this.primaryColor = JSON.stringify(store.state['@primary-color'])
    this.primaryBg = JSON.stringify(store.state['@primary-bg'])
    const typeWebsite = store.state.typeWebsite
    this.type = typeWebsite
      .filter((v: string) => v.includes('t'))
      .map((v: string) => this.removeWT(v))
    this.website = typeWebsite
      .filter((v: string) => v.includes('w'))
      .map((v: string) => this.removeWT(v))
  }

  private setPreset = (preset: PresetTheme) => {
    const { typeWebsite, primaryColor, primaryBg } = preset

    const variables = Object.assign(
      {},
      primaryColor.variables,
      primaryBg.variables,
    )
    store.commit('chageState', {
      key: 'typeWebsite',
      value: typeWebsite,
      dbSet: true,
    })
    ;(window as any).less
      .modifyVars(variables)
      .then(() => {
        store.commit('chageState', {
          key: '@primary-color',
          value: primaryColor,
          dbSet: true,
        })
        store.commit('chageState', {
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
        const [type = [], Website = [], theme = {}] = preset
        const { primary_color: primaryColor, primary_bg: primaryBg } = theme
        this.setPreset({
          primaryColor: primaryColor && JSON.parse(primaryColor),
          primaryBg: primaryBg && JSON.parse(primaryBg),
          typeWebsite: [...type, ...Website],
        })
        message.success('同步预设成功')
      })
      .catch(() => {
        message.error('同步预设失败~')
      })
  }
  public values = () => {
    const { savePreset, syncPreset } = this
    return {
      savePreset,
      syncPreset,
    }
  }
}

export default new Preset()
