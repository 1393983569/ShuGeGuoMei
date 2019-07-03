import request from '@/utils/request'

export function login(data) {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/basics/login',
    method: 'post',
    params
  })
}

export function getInfo(roleId) {
  return request({
    url: `/basics/getAllMenu?roleId=${roleId}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/basics/logout',
    method: 'get'
  })
}
