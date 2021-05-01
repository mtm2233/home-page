/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-26 22:00:13
 * @LastEditTime: 2021-04-28 22:41:53
 * @LastEditors: mTm
 */
import config from '@/config'

interface SetItem {
  key: string
  value: any
  expires?: number
}

class DB {
  public prefix: string | number
  public storage: Storage

  constructor(prefix: string | number) {
    this.prefix = prefix
    this.storage = window.localStorage || null
  }

  verify(): boolean {
    if (this.storage) {
      return true
    } else {
      return false
    }
  }

  prefixKey(key: string) {
    return `${this.prefix}-${key}`
  }

  get(key: string): any {
    if (!this.verify()) {
      return false
    }
    let item: any = this.storage.getItem(this.prefixKey(key))
    if (!item) {
      return item
    }
    //先将拿到的试着进行json转为对象的形式
    try {
      item = JSON.parse(item)
    } catch {
      //如果不行就不是json的字符串，就直接返回
      return item
    }

    //如果有expires的值，说明设置了失效时间
    if (item && item.startTime && item.expires) {
      const date = new Date().getTime()
      //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
      if (date - item.startTime > item.expires) {
        //缓存过期，清除缓存，返回false
        this.remove(key)
        return false
      } else {
        //缓存未过期，返回值
        return item.value
      }
    } else {
      //如果没有设置失效时间，直接返回值
      return item
    }
  }

  has(key: string): boolean {
    return this.verify() && this.get(this.prefixKey(key))
  }

  set(data: SetItem) {
    if (!this.verify()) {
      return false
    }
    const obj: SetItem = {
      key: '',
      value: '',
    }
    const itemData = Object.assign(obj, data, {
      //记录何时将值存入缓存，毫秒级
      startTime: new Date().getTime(),
    })

    itemData.key = this.prefixKey(itemData.key)

    //data.expires设置了的话
    if (itemData.expires) {
      this.storage.setItem(itemData.key, JSON.stringify(itemData))
    } else {
      //如果options.expires没有设置，就判断一下value的类型
      const type = Object.prototype.toString.call(itemData.value)
      if (type === '[object Object]' || type === '[object Array]') {
        itemData.value = JSON.stringify(itemData.value)
      }
      this.storage.setItem(itemData.key, itemData.value)
    }
  }

  remove(key: string) {
    this.verify() && this.storage.removeItem(this.prefixKey(key))
  }

  clear() {
    this.verify() && this.storage.clear()
  }
}

export default new DB(config.dbPrefix)
