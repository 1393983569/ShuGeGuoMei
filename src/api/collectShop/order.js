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
 * 查询订单详情
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
