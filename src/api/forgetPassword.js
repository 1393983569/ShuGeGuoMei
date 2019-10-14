import request from '../utils/request'
/**
 * 获取验证码
 */
export const getCode = () => {
  return request({
    url: '/basics/getCode',
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
