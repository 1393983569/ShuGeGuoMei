import request from '@/utils/request'
/**
 * 查询积分规则
 */
export function getIntegralRule() {
  return request({
    url: '/admin/integralRule',
    method: 'post',
  })
}
/**
 * 启停用积分规则
 * @param {Number} id
 * @param {Number} status
 */
export function changeStatus(id, status) {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('status', status)
  return request({
    url: '/admin/editIntegralRule',
    method: 'post',
    data:params
  })
}
