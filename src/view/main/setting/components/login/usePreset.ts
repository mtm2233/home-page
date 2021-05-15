/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-15 21:06:44
 * @LastEditTime: 2021-05-15 23:12:49
 * @LastEditors: mTm
 */
// import db from '@/libs/db'
import { message } from 'ant-design-vue'
import { store } from '@/store'
import { typeSet, typeGet, websiteSet, websiteGet } from '@/api/preset'

interface Theme {
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
  getType() {
    return typeGet().then(res => res.data.map((typeId: number) => `t${typeId}`))
  }

  getWebsite() {
    return websiteGet().then(res =>
      res.data.map((typeId: number) => `w${typeId}`),
    )
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
  private setPreset = (theme: Theme) => {
    const { typeWebsite } = theme
    store.commit('chageState', {
      key: 'typeWebsite',
      value: typeWebsite,
      dbSet: true,
    })
  }

  // 保存预设
  private savePreset = () => {
    this.init()
    Promise.all([this.setType(), this.setWebsite()])
      .then(() => {
        message.success('保存预设成功')
      })
      .catch(() => {
        message.error('保存预设失败~')
      })
  }
  // 同步预设
  private syncPreset = () => {
    Promise.all([this.getType(), this.getWebsite()])
      .then((theme: any) => {
        const [type = [], Website = [], primaryColor, primaryBg] = theme
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
