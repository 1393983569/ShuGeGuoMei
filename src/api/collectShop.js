import request from '../utils/request'
/**
 * 添加商品
 * @param {Object} data 商品对象
 */
export const addGoods = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {

    if (data[key]||data[key]===0) params.append(key, data[key])
  }
  return request({
    url: '/admin/addGoods',
    method: 'post',
    data: params
  })
}
/**
 * 删除商品
 * @param {Integer} id 商品id
 */
export const deleteGoods = (id) => {
  const params = new URLSearchParams()
  params.append('id', id)
  return request({
    url: '/admin/deleteGoods',
    data: params,
    method: 'post'
  })
}
/**
 * 编辑商品
 * @param {Object} data 商品对象
 */
export const editGoods = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]!=='undefined'){
      if (data[key]||data[key]===0) params.append(key, data[key])
    }
  }
  return request({
    url: '/admin/editGoods',
    method: 'post',
    data: params
  })
}
/**
 * 查询商品列表
 * @param {Integer} pageNum 当前页
 * @param {Integer} pageSize 每页记录
 * @param {Integer} state 状态
 * @param {Integer} categoryOneId 一级品类id
 * @param {Integer} categoryTwoId 二级品类id
 */
export const getGoodsList = (pageNum, pageSize, state, categoryOneId, categoryTwoId) => {
  const params = new URLSearchParams()
  if(pageNum) params.append('pageNum', pageNum)
  if(pageSize) params.append('pageSize', pageSize)
  if(state+'') params.append('state', state)
  if(categoryOneId) params.append('categoryOneId', categoryOneId)
  if(categoryTwoId) params.append('categoryTwoId', categoryTwoId)
  return request({
    url: '/admin/getAllGoods',
    method: 'post',
    data: params
  })
}
/**
 * 上下架商品
 * @param {Integer} id 商品id
 * @param {Integer} isShelf 是否上架状态
 */
export const shelfGoods = (id, isShelf) => {
  const params = new URLSearchParams()
  params.append('id', id)
  params.append('isShelf', isShelf)
  return request({
    url: '/admin/isShelfGoods',
    method: 'post',
    data: params
  })
}
/**
 * 查询商品详情
 * @param {Integer} id 商品id
 */
export const seeDetailsGoods = (id) => {
  return request({
    url: `/admin/seeDetailsGoods?id=${id}`,
    method: 'get'
  })
}
/**
 * 根据品类查询商品
 * @param {Integer} categoryOneId
 * @param {Integer} categoryTwoId
 */
export const getGoods = (categoryOneId, categoryTwoId) => {
  const params = new URLSearchParams()
  if(categoryOneId)params.append('categoryOneId', categoryOneId)
  if(categoryTwoId)params.append('categoryTwoId', categoryTwoId)
  return request({
    url: '/admin/getAllGoodsNoPage',
    method: 'post',
    data: params
  })
}
/**
 * 根据供应商查供应商品
 * @param {Number} id
 */
export const getSupplyGoods = (id) => {
  const params = new URLSearchParams()
  params.append('providerId', id)
  return request({
    url: '/admin/findProviderGoods',
    method: 'post',
    data: params
  })
}
