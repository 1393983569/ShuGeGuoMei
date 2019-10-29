import request from '@/utils/request'
/**
 * 商品定价表
 * @param {number} pageNum
 * @param {number} pageSize
 * @param {String} shopId
 * @param {String} year
 * @param {String} month
 * @param {String} day
 */
export function getAllInventoryGoods(pageNum,pageSize,shopId, year, month, day, startTime,endTime) {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('pageSize', pageSize)
  if(shopId)params.append('shopId', shopId)
  if(year)params.append('year', year)
  if(month)params.append('month', month)
  if(day)params.append('day', day)
  if(startTime)params.append('startTime', startTime)
  if(endTime)params.append('endTime', endTime)
  return request({
    url: '/admin/getAllInventoryGoods',
    method: 'post',
    data:params
  })
}
