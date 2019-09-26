import request from '../../utils/request'

/**
 * 查询基础数据下的所有省份
 */
export const selectSysProvince = () => {
  return request({
    url: `/basics/selectProvince`,
    method: 'get'
  })
}

/**
 * 查询基础数据省下的所有城市
 * @param provinceId
 */
export const selectSysCity = (provinceId) => {
  return request({
    url: `/basics/selectCity?parentId=${provinceId}`,
    method: 'get'
  })
}
/**
 * 查询所有省市区
 */
export const selectAllData = () => {
  return request({
    url: `/basics/selectAllData`,
    method: 'get'
  })
}
/**
 * 查询基础数据市下的区县
 * @param cityId
 */
export const selectSysArea = (cityId) => {
  return request({
    url: `/basics/selectArea?cityId=${cityId}`,
    method: 'get'
  })
}

/**
 * 添加城市基础数据
 * @param data
 */
export const addSysArea = (data) => {
  return request({
    url: '/basics/addSysArea',
    method: 'post',
    data
  })
}
/**
 * 删除省市区
 * @param {Integer} proviceId 省id
 * @param {Integer} cityId 市id
 * @param {Integer} areaId 区县id
 */
export const deleteSysArea = (provinceId, cityId, areaId) => {
  // console.log('proviceId:',proviceId,'cityId:', cityId,'areaId:', areaId)
  const params = new URLSearchParams()
  if(provinceId)params.append('provinceId', provinceId)
  if(cityId)params.append('cityId', cityId)
  if(areaId)params.append('areaId', areaId)
  return request({
    url: `/basics/deleteCity`,
    method: 'post',
    data:params
  })
}
