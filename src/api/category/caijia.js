import request from '../../utils/request'

/**
 * 查询采价
 */
export const selectCaijia = (data) => {
  let params = new URLSearchParams()
  if(data.areaId)params.append('areaId', data.areaId)
  if(data.cityId)params.append('cityId', data.cityId)
  params.append('pageNum', data.pageNum)
  params.append('pageSize', data.pageSize)
  if(data.provinceId)params.append('provinceId', data.provinceId)
  return request({
    url: '/basics/queryPageMarket',
    method: 'post',
    data:params
  })
}
/**
 * 添加采价
 */
export const addCaijia = (data) => {
  let params = new URLSearchParams()
  if(data.areaId)params.append('areaId', data.areaId)
  if(data.cityId)params.append('cityId', data.cityId)
  if(data.name)params.append('name', data.name)
  if(data.provinceId)params.append('provinceId', data.provinceId)
  params.append('type', data.type)
  return request({
    url: '/basics/addMarket',
    method: 'post',
    data:params
  })
}
/**
 * 编辑采价
 */
export const editCaijia = (data) => {
  let params = new URLSearchParams()
  if(data.id)params.append('id', data.id)
  if(data.areaId)params.append('areaId', data.areaId)
  if(data.cityId)params.append('cityId', data.cityId)
  if(data.name)params.append('name', data.name)
  if(data.provinceId)params.append('provinceId', data.provinceId)
  params.append('type', data.type)
  return request({
    url: '/basics/editMarket',
    method: 'post',
    data:params
  })
}
/**
 * 删除采价
 */
export const deleteCaijia = (id) => {
  return request({
    url: `/basics/deleteMarket?id=${id}&priceMarketId=${id}`,
    method: 'get'
  })
}
/**
 * 查询所有采价市场
 */
export const getAllCaijia = ()=> {
  return request({
    url: '/price/selectAll',
    method: 'post'
  })
}
