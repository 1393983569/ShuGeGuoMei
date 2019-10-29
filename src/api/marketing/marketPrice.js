import request from '@/utils/request'
/**
 * 价格行情
 * @param {Number} pageNum
 * @param {Number} pageSize
 * @param {Number} categoryOneId
 * @param {String} year
 * @param {String} month
 * @param {String} day
 * @param {String} priceMarketName
 * @param {String} priceMarketType
 */
export function getAllPriceGoods(pageNum, pageSize, categoryOneId, year, month, day,priceMarketName,priceMarketType) {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('pageSize', pageSize)
  if(categoryOneId)params.append('categoryOneId', categoryOneId)
  if(year)params.append('year', year)
  if(month)params.append('month', month)
  if(day)params.append('day', day)
  if(priceMarketName)params.append('priceMarketName', priceMarketName)
  if(priceMarketType)params.append('priceMarketType', priceMarketType)
  return request({
    url: '/admin/getAllPriceGoods',
    method: 'post',
    data:params
  })
}
