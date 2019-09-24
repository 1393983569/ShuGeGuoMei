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
