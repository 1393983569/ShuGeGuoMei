import request from '@/utils/request'
/**
 * 添加会员
 * @param {Object} data 会员对象
 */
export const addVip = (data) => {
 const params = new URLSearchParams()
 for (const key in data) {
   if(key)params.append(key, data[key])
 }
 return request({
   url: '/admin/addMember',
   data: params,
   method:'post'
 })
}
/**
 * 删除会员id
 * @param {Integer} id 会员id
 */
export const deleteVip = (id) => {
  return request({
    url:`/admin/deleteMember?id=${id}`,
    method:'get'
  })
}
/**
 * 分页查询vip
 * @param {Integer} identity 身份
 * @param {Integer} level 级别
 * @param {Integer} pageNum 页数
 * @param {Integer} pageSize 记录数
 */
export const getVipList = (identity,level, pageNum, pageSize) => {
  return request({
    url:`/admin/queryMember?identity=${identity}&level=${level}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method:'get'
  })
}
/**
 * 会员详情
 * @param {Integer} id 会员id
 */
export const  vipDetail = (id) => {
  return request({
    url: `/admin/findMember?id=${id}`,
    method:'get'
  })
}
