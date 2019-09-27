import request from '../../utils/request'

/**
 * 查询采价用户列表
 * @param data
 */
export const getCaijiaUser = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/selectDetailMarketMan',
    method: 'post',
    data: params
  })
}
/**
 * 添加采价用户
 * @param data
 */
export const addCaijiaUser = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/addMarketMan',
    method: 'post',
    data: params
  })
}
/**
 * 编辑采价用户
 * @param data
 */
export const editCaijiaUser = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/editMarketMan',
    method: 'post',
    data: params
  })
}
/**
 * 删除采价用户
 * @param data
 */
export const deleteCaijiaUser = (id) => {
  return request({
    url: `/admin/deleteMarketMan?id=${id}`,
    method: 'get'
  })
}
/**
 * 根据省市区查询采价端用户
 * @param data
 */
export const getPriceMarket = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/basics/selectPriceMarket',
    method: 'post',
    data: params
  })
}
