/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-05-01 18:32:36
 * @LastEditTime: 2021-11-01 21:15:51
 * @LastEditors: mTm
 */
import { useCodeLogin } from 'isdream-oauth'
import { oauthLogin } from '@/api/user'
import { store } from '@/store'
import preset from '@/view/main/components/login/usePreset'

export default async function () {
  try {
    const { oauthLoginCallback } = useCodeLogin({
      client_id: import.meta.env.VITE_OAUTH_CLIENT_ID!,
      redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI!,
    })
    const data = await oauthLoginCallback()
    const res = await oauthLogin(data)
    store.commit('setToken', {
      token: res.data.token,
      expires: res.data.expires,
    })

    preset.values.syncPreset()

    const newPath = location.origin + location.pathname
    location.href = newPath
  } catch (error) {}
}
