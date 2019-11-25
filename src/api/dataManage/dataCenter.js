import request from '@/utils/request'

/**
 * 查询营业数据
 * @param {String} year
 * @param {String} month
 * @param {String} day
 * @param {Number} shopId
 */
export const getBusiness=(year, month, day, shopId) => {
  const params = new URLSearchParams()
  if(year)params.append('year', year)
  if(month)params.append('month', month)
  if(day)params.append('day', day)
  if(shopId)params.append('shopId', shopId)
  return request({
    url: '/admin/selectBusiness',
    method: 'post',
    data: params
  })
}
/**
 * 查询今天硬数据
 * @param {String} year
 * @param {String} month
 * @param {String} day
 * @param {Number} shopId
 */
export const getJintYing = (year, month, day, shopId) => {
  const params = new URLSearchParams()
  if(year)params.append('year', year)
  if(month)params.append('month', month)
  if(day)params.append('day', day)
  if(shopId)params.append('shopId', shopId)
  return request({
    url: '/admin/selectManage',
    method: 'post',
    data: params
  })
}
