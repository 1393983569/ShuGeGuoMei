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
/**
 * 检查短信验证码
 * @param {String} mobile 手机号
 * @param {String} sms 验证码
 */
export const checkCode = (mobile, sms) => {
  const params = new URLSearchParams()
  if(mobile)params.append('mobile',mobile)
  if(sms)params.append('sms',sms)
  return request({
    url: '/basics/unused',
    method: 'post',
    data: params
  })
}
/**
 * 发送验证码
 * @param {String} mobile 手机号
 */
export const sendCode = (mobile) => {
  const params = new URLSearchParams()
  if(mobile)params.append('mobile',mobile)
  return request({
    url: '/basics/sendSms',
    method: 'post',
    data: params
  })
}
