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
 * @param {Integer} orderId 订单id
 */
export const orderDetail = (orderId) => {
  const params = new URLSearchParams()
  params.append('orderId', orderId)
  return request({
    url: '/admin/selectOrderDetail',
    data:params,
    method: 'post'
  })
}
