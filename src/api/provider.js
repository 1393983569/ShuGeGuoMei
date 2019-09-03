import request from '../utils/request'
/**
 * 添加供应商
 * @param {Object} data 供应商对象
 */
export const addProvider = (data) => {
  // const params = new URLSearchParams()
  // params.append('providerGoods', data.providerGoods)
  return request({
    url: `/admin/addProvider?name=${data.name}&headerPic=${data.headerPic}&contactName=${data.contactName}&mobile=${data.mobile}&phone=${data.phone}&wechat=${data.wechat}&qq=${data.qq}&email=${data.email}&provinceId=${data.provinceId}&cityId=${data.cityId}&areaId=${data.areaId}&addressDetail=${data.addressDetail}&area=${data.area}&remark=${data.remark}&providerShops=${data.providerShops}&status=${data.status}`,
    headers: {
      'content-Type': 'application/json;charset=UTF-8'
    },
    method: 'post',
    data: data.providerGoods
  })
}
/**
 * 删除供应商
 * @param {int} id 供应商id
 */
export const deleteProvider = (id) => {
  // const params = new URLSearchParams()
  // for (const key in data) {
  //   // console.log(key, 'key....')
  //   if (data[key]) params.append(key, data[key])
  // }
  return request({
    url: `/admin/delProvider?id=${id}&?name=${data.name}&headerPic=${data.headerPic}&contactName=${data.contactName}&mobile=${data.mobile}&phone=${data.phone}&wechat=${data.wechat}&qq=${data.qq}&email=${data.email}&provinceId=${data.provinceId}&cityId=${data.cityId}&areaId=${data.areaId}&addressDetail=${data.addressDetail}&area=${data.area}&remark=${data.remark}&providerShops=${data.providerShops}`,
    method: 'get',
    data: data.providerGoods
  })
}
/**
 * 修改供应商信息
 * @param {Object} data 供应商对象
 */
export const editProvider = (data) => {
  // const params = new URLSearchParams()
  // for (const key in data) {
  //   if (data[key]) params.append(key, data[key])
  // }
  return request({
    url: '/admin/editProvider',
    method: 'post',
    data: params
  })
}
/**
 * 分页查询供应商
 * @param {int} pageNum 当前页
 * @param {int} pageSize 每页记录数
 */
export const getProvider = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/selectAll',
    method: 'post',
    data: params
  })
}
/**
 * 查询供应商详情
 * @param {Integer} id 供应商id
 */
export const getProviderDetail = (id) => {
  // const params = new URLSearchParams()
  // for (const key in data) {
  //   if (data[key]) params.append(key, data[key])
  // }
  return request({
    url: `/admin/selectOne?id=${id}`,
    method: 'get',
    // data: params
  })
}
/**
 * 查询所有供应商
 */
export const getAllProvider = () => {
  return request({
    url: '/admin/getAllProvider',
    method: 'get'
  })
}
