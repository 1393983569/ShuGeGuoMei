import request from '../utils/request'
/**
 * 添加供应商
 * @param {Object} data 供应商对象
 */
export const addProvider = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    // console.log(key, 'key....')
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/provider/add',
    method: 'post',
    data: params
  })
}
/**
 * 删除供应商
 * @param {int} id 供应商id
 */
export const deleteProvider = (id) => {
  // const params = new URLSearchParams()
  // for (const key in data) {
  //   // console.log(key, 'key....')
  //   if (data[key]) params.append(key, data[key])
  // }
  return request({
    url: `/admin/provider/delete?id=${id}`,
    method: 'get'
    // data: params
  })
}
/**
 * 修改供应商信息
 * @param {Object} data 供应商对象
 */
export const editProvider = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/provider/edit',
    method: 'post',
    data: params
  })
}
/**
 * 分页查询供应商
 * @param {int} pageNum 当前页
 * @param {int} pageSize 每页记录数
 */
export const getProvider = (pageNum, pageSize) => {
  // const params = new URLSearchParams()
  // for (const key in data) {
  //   if (data[key]) params.append(key, data[key])
  // }
  return request({
    url: `/admin/provider/selectAll?pageNum=${pageNum}&pageSize= ${pageSize}`,
    method: 'get'
    // data: params
  })
}