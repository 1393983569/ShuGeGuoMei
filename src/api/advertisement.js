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
    url: '/admin/advertisement/add',
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
    url: '/admin/advertisement/edit',
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
  // const params = new URLSearchParams()
  // for (const key in data) {
  //   if (data[key]) params.append(key, data[key])
  // }
  return request({
    url: `/admin/advertisement/getAll?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get'
    // data: params
  })
}
export const deleteAdvertisement = (id) => {
  // const params = new URLSearchParams()
  // for (const key in data) {
  //   if (data[key]) params.append(key, data[key])
  // }
  return request({
    url: `/admin/advertisement/delete?id=${id}`,
    method: 'get'
    // data: params
  })
}
