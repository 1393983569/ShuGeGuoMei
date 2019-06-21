import request from '../utils/request'

/**
 * 添加店铺
 * @param {Object} data 店铺信息对象
 */
export const addShop = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/shop/add',
    method: 'post',
    data: params
  })
}
/**
 * 编辑店铺信息
 * @param {Object} data 店铺信息对象
 */
export const editShop = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) {
      params.append(key, data[key])
    }
  }
  return request({
    url: '/admin/shop/update',
    method: 'post',
    data: params
  })
}
/**
 * 查询店铺列表
 * @param {Integer} pageNum 当前页
 * @param {Integer} pageSize 每页记录数
 */
export const getShopList = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/shop/getAll',
    method: 'post',
    data: params
  })
}
/**
 * 删除店铺
 * @param {Integer} id 店铺id
 */
export const deleteShop = (id) => {
  const params = new URLSearchParams()
  return request({
    url: `/admin/shop/delete?id=${id}`,
    method: 'get',
    data: params
  })
}
/**
 * 启用/停用店铺
 * @param {Integer} id 店铺id
 * @param {Integer} status 店铺状态
 */
export const startShop = (id, status) => {
  const params = new URLSearchParams()
  return request({
    url: `/admin/shop/updateStatus?id=${id}&status=${status}`,
    method: 'get',
    data: params
  })
}
/**
 * 查询所有商铺
 */
export const getAllShop = () => {
  const params = new URLSearchParams()
  return request({
    url: '/admin/shop/selectAll',
    method: 'get',
    data: params
  })
}
