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
    method: 'get',
    data: params
  })
}
