/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-08 09:11:58
 * @LastEditTime: 2021-05-18 09:48:31
 * @LastEditors: mTm
 */
export interface TypeForm {
  pid: number | null
  name: string
}

export interface Type {
  id: number
  name: string
  is_edit?: boolean | number
  children?: Type[]
  disabled?: boolean
}
export interface Option {
  label: string
  value: number | string
  children?: Option[]
}

export const typeRules = {
  name: [
    { required: true, message: '请输入分类名', trigger: 'blur' },
    { min: 1, max: 20, message: '分类名应该在1~20直接', trigger: 'blur' },
  ],
}

export interface WebsiteForm {
  type_id: number | undefined
  name: string
  url: string
  description?: string | null
}

export const websiteRules = {
  type_id: [
    { required: true, message: '请选择分类', trigger: 'blur', type: 'number' },
  ],
  name: [
    { required: true, message: '请输入网址名', trigger: 'blur' },
    { min: 1, max: 20, message: '分类名应该在1~20直接', trigger: 'blur' },
  ],
  url: [{ required: true, message: '请输入网址', trigger: 'blur' }],
}
