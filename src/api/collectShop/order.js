import request from '@/utils/request'
/**
 * 查询订单列表
 * @param {Object} data 订单对象
 */
export const getOrder= (data) => {
  const params = new URLSearchParams()
  for(const key in data){
    if(data[key])params.append(key, data[key])
  }
  return request({
    url:'/admin/queryOrder',
    method:'post',
    data:params
  })
}
/**
 * 查询订单详情/app/selectSubOrder
 * @param {Integer} orderNo 订单编号
 */
export const orderDetail = (orderNo) => {
  const params = new URLSearchParams()
  params.append('orderNo', orderNo)
  return request({
    url: '/admin/selectOrderDetail',
    data:params,
    method: 'post'
  })
}
/**
 * 查询子订单详情
 * @param {Integer} orderNo
 */
export const orderSubDetail = (orderNo) => {
  // const params = new URLSearchParams()
  // params.append('orderNo', orderNo)
  return request({
    url: `/app/selectSubOrder?suborderNo=${orderNo}`,
    // data:params,
    method: 'get'
  })
}
// 拆单
export const separateBill = (providerId, list,orderId, orderNo, money) => {
  // const params = new URLSearchParams()
  // params.append('list', list)
  return request({
    url:`/admin/dismantling?providerId=${providerId}&orderId=${orderId}&orderNo=${orderNo}&money=${money}`,
    method:'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: list
  })
}
/**
 * 保存入库数量
 * @param {Integer} id 商品记录id
 * @param {Inteager} inputQuantity 入库数量
 */
export const enterQuantity = (id, inputQuantity) => {
  return request({
    url: `/app/updateInputQuantity?id=${id}&inputQuantity=${inputQuantity}`,
    method: 'get'
  })
}
/**
 * 删除订单
 */
export const deleteSubOrder = (id) => {
  return request({
    url: `/app/deleteSubOrder?id=${id}`,
    method: 'get'
  })
}
/**
 * 修改订单状态
 */
export const updateSubOrderStatus = (id, status) => {
  return request({
    url: `/app/updateSubOrderStatus?id=${id}&status=${status}`,
    method: 'get'
  })
}
/**
 * 修改已被拆单过商品的状态
 * @param {String} goods 商品ID字符串
 * @param {Integer} orderId 大订单id
 */
export const updateChoose = (goods,orderId) => {
  return request({
    url: `/admin/updateChoose?goods=${goods}&orderId=${orderId}`,
    method: 'get'
  })
}
