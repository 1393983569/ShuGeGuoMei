import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getUserId() {
  return Cookies.get('id')
}

export function setUserId(id) {
  return Cookies.set('id', id)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getAvatar() {
  return Cookies.get('Avatar')
}

export function setAvatar(Avatar) {
  return Cookies.set('Avatar', Avatar)
}
// 用户姓名
export function getUserName() {
  return Cookies.get('UserName')
}

export function setUserName(UserName) {
  return Cookies.set('UserName', UserName)
}
// 用户手机
export function getUserMobile() {
  return Cookies.get('UserMobile')
}
export function setUserMobile(UserMobile) {
  return Cookies.set('UserMobile', UserMobile)
}
// 用户角色
export function getUserRole() {
  return Cookies.get('UserRole')
}
export function setUserRole(UserRole) {
  return Cookies.set('UserRole', UserRole)
}
// 用户角色
export function getAdminId() {
  return Cookies.get('AdminId')
}
export function setAdminId(AdminId) {
  return Cookies.set('AdminId', AdminId)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
