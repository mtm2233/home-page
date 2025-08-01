import service from '@/libs/service'

export function oauthLogin(data: any): Promise<any> {
  return service.request({
    url: '/api/user/oauth_login',
    method: 'POST',
    data,
  })
}
