import request from '../utils/request'

/**
 * 添加店铺
 * @param {Object} data 店铺信息对象
 */
export const addShop = (data) => {
  const params = new URLSearchParams()
  params.append('categoryJson', data.categoryJson)
  return request({
    url: `/admin/addShop?name=${data.name}&simpleName=${data.simpleName}&adminName=${data.adminName}&adminPhone=${data.adminPhone}&adminPassword=${data.adminPassword}&provinceId=${data.provinceId}&cityId=${data.cityId}&countyId=${data.countyId}&area=${data.area}&management=${data.management}&imge=${data.imge}&detailsAddress=${data.detailsAddress}`,
    // headers: {
    //   'content-Type': 'application/json;charset=UTF-8'
    // },
    method: 'post',
    data: params
  })
}
/**
 * 编辑店铺信息
 * @param {Object} data 店铺信息对象
 */
export const editShop = (data) => {
  console.log(data, 'data....')
  const params = new URLSearchParams()
  params.append('categoryJson', data.categoryJson)
  return request({
    url: `/admin/updateShop?id=${data.id}&name=${data.name}&simpleName=${data.simpleName}&adminName=${data.adminName}&adminPhone=${data.adminPhone}&adminPassword=${data.adminPassword}&provinceId=${data.provinceId}&cityId=${data.cityId}&countyId=${data.countyId}&area=${data.area}&management=${data.management}&imge=${data.imge}&detailsAddress=${data.detailsAddress}`,
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
    url: '/admin/getAllShop',
    method: 'post',
    data: params
  })
}
/**
 * 删除店铺
 * @param {Integer} id 店铺id
 */
export const deleteShop = (id, shopId) => {
  const params = new URLSearchParams()
  return request({
    url: `/admin/deleteShop?id=${id}&shopId=${shopId}`,
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
    url: `/admin/updateStatus?id=${id}&status=${status}`,
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
    url: '/admin/selectAllShop',
    method: 'get',
    data: params
  })
}
