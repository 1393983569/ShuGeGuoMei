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
export const getVipList = (identity,level,shopId, pageNum, pageSize, param) => {
  return request({
    url:`/admin/queryMember?identity=${identity}&level=${level}&shopId=${shopId}&pageNum=${pageNum}&pageSize=${pageSize}&param=${param}`,
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
/**
 * 会员系统说明添加
 * @param {Object} data 会员系统说明对象
 */
export const addSystemMsg = (content) => {
  const params = new URLSearchParams()
  params.append('content', content)
  return request({
    url:'/admin/addShow',
    method:'post',
    data: params
  })
}
/**
 * 会员消费记录
 * @param {Integer} pageNum 页码
 * @param {Integer} pageSize 记录数
 */
export const getVipRecords = (memberId,pageNum, pageSize) => {
  const params = new URLSearchParams()
  params.append('memberId', memberId)
  params.append('pageNum', pageNum)
  params.append('pageSize', pageSize)
  return request({
    url:'/admin/selectMember',
    method:'post',
    data: params,
  })
}
