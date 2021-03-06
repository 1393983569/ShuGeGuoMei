import request from '../utils/request'

/**
 * 查询省份
 */
export const getProvince = () => {
  // const params = new URLSearchParams()
  // for (const key in data) {
  //   // console.log(key, 'key....')
  //   if (data[key]) params.append(key, data[key])
  // }
  return request({
    url: '/basics/selectSysProvince',
    method: 'get'
    // data: params
  })
}
/**
 * 查询省份下的市
 * @param { Integer } id 省id
 */
export const getCity = (id) => {
  // const params = new URLSearchParams()
  // params.append('parentId', id)
  return request({
    url: `/basics/selectSysCity?provinceId=${id}`,
    method: 'get'
    // data: params
  })
}
/**
 * 查询城市下的区县
 * @param { Integer } id 城市Id
 */
export const getArea = (id) => {
  // const params = new URLSearchParams()
  // params.append('cityId', id)
  return request({
    url: `/basics/selectSysArea?cityId=${id}`,
    method: 'get'
    // data: params
  })
}

/**
 * 查询所有省份
 */
export const getAllProvince = () => {
  // const params = new URLSearchParams()
  // for (const key in data) {
  //   // console.log(key, 'key....')
  //   if (data[key]) params.append(key, data[key])
  // }
  return request({
    url: '/basics/selectProvince',
    method: 'get'
    // data: params
  })
}
/**
 * 查询省份下的所有市
 * @param { Integer } id 省id
 */
export const getAllCity = (id) => {
  // const params = new URLSearchParams()
  // params.append('parentId', id)
  return request({
    url: `/basics/selectCity?parentId=${id}`,
    method: 'get'
    // data: params
  })
}
/**
 * 查询城市下的所有区县
 * @param { Integer } id 城市Id
 */
export const getAllArea = (id) => {
  // const params = new URLSearchParams()
  // params.append('cityId', id)
  return request({
    url: `/basics/selectArea?cityId=${id}`,
    method: 'get'
    // data: params
  })
}
