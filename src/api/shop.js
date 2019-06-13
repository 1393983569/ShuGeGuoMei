import request from '../utils/request'

/**
 * 添加店铺
 * @param {Object} data 店铺信息对象
 */
export const addShop = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    // console.log(key, 'key....')
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
export const getShopList = (pageNum, pageSize) => {
  const params = new URLSearchParams()
  return request({
    url: `/admin/shop/getAll?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get',
    data: params
  })
}
