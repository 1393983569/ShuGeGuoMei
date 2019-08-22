import request from '../utils/request'
/**
 * 添加广告
 */
export const addAdvertisement = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    // console.log(key, 'key....')
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/addAdv',
    method: 'post',
    data: params
  })
}
/**
 * 修改广告信息
 * @param {Object} data 修改对象
 */
export const editAdvertisement = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/editAdv',
    method: 'post',
    data: params
  })
}
/**
 * 分页查询记录数
 * @param {int} pageNum 当前页
 * @param {int} pageSize 每页记录数
 */
export const getAdvertisement = (pageNum, pageSize) => {
  const params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('pageSize', pageSize)
  return request({
    url: '/admin/getAllAdv',
    method: 'post',
    data: params
  })
}
/**
 * 删除广告
 * @param {int} id 广告id
 */
export const deleteAdvertisement = (id) => {
  // const params = new URLSearchParams()
  // for (const key in data) {
  //   if (data[key]) params.append(key, data[key])
  // }
  return request({
    url: `/admin/deleteAdv?id=${id}`,
    method: 'get'
    // data: params
  })
}
/**
 * 上架广告
 * @param {int} id 广告id
 * @param {int} status 广告状态
 */
export const shelfAdvertisement = (status, id) => {
  // const params = new URLSearchParams()
  // for (const key in data) {
  //   if (data[key]) params.append(key, data[key])
  // }
  return request({
    url: `/admin/isShelf?status=${status}&id=${id}`,
    method: 'get'
    // data: params
  })
}
/**
 * 广告置顶
 * @param {Integer} id 广告id
 */
export const topAdvertisement =(id,istop) => {
 return request({
   url: `/admin/istop?id=${id}&istop=${istop}`,
   method:'get'
 })
}
