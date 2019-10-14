import request from '../utils/request'
/**
 * 获取验证码
 */
export const getCode = () => {
  return request({
    url: '/basics/getImgCode',
    method: 'get'
  })
}
/**
 * 忘记密码
 * @param {Object} data 登录数据
 */
export const forgetPwd = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/basics/forgetPwd',
    method: 'post',
    data: params
  })
}
/**
 * 修改密码
 * @param {Object} data 用户密码信息
 */
export const editPwd = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/basics/editPwd',
    method: 'post',
    data: params
  })
}
