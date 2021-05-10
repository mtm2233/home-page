/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-08 09:11:58
 * @LastEditTime: 2021-05-10 23:33:30
 * @LastEditors: mTm
 */
export interface TypeForm {
  pid: number | undefined
  name: string
}

export interface Type {
  id: number
  name: string
  is_edit?: boolean | number
  children?: Type[]
}
export interface Option {
  label: string
  value: number | string
  children?: Option[]
}

export const typeRules = {
  name: [
    { required: true, message: '请输入分类名', trigger: 'blur' },
    { min: 2, max: 5, message: '分类名应该在2~5直接', trigger: 'blur' },
  ],
}

export interface WebsiteForm {
  pid: number | undefined
  name: string
  website: string
}

export const websiteRules = {
  name: [
    { required: true, message: '请输入分类名', trigger: 'blur' },
    { min: 2, max: 5, message: '分类名应该在2~5直接', trigger: 'blur' },
  ],
  website: [{ required: true, message: '请输入网址', trigger: 'blur' }],
}
