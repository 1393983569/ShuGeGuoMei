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
/**
 * 查询收入构成
 * @param {String} year
 * @param {String} month
 * @param {String} day
 * @param {Number} shopId
 */
export const getIncome = (year, month, day, shopId) => {
  const params = new URLSearchParams()
  if(year)params.append('year', year)
  if(month)params.append('month', month)
  if(day)params.append('day', day)
  if(shopId)params.append('shopId', shopId)
  return request({
    url: '/admin/selectIncome',
    method: 'post',
    data: params
  })
}
/**
 * 查询收入趋势
 * @param {String} year
 * @param {Number} shopId
 */
export const getIncomeTrend = (year,shopId) => {
  const params = new URLSearchParams()
  if(year)params.append('year', year)
  if(shopId)params.append('shopId', shopId)
  return request({
    url: '/admin/selectIncomeTrend',
    method: 'post',
    data: params
  })
}
/**
 * 查询损耗数据
 * @param {String} year
 * @param {String} month
 * @param {String} day
 * @param {Number} shopId
 */
export const getLossData = (year, month, day, shopId) => {
  const params = new URLSearchParams()
  if(year)params.append('year', year)
  if(month)params.append('month', month)
  if(day)params.append('day', day)
  if(shopId)params.append('shopId', shopId)
  return request({
    url: '/admin/selectLossData',
    method: 'post',
    data: params
  })
}
/**
 * 查询会员分析
 * @param {String} year
 * @param {String} month
 * @param {String} day
 * @param {Number} shopId
 */
export const getVip = (year, month, day, shopId) => {
  const params = new URLSearchParams()
  if(year)params.append('year', year)
  if(month)params.append('month', month)
  if(day)params.append('day', day)
  if(shopId)params.append('shopId', shopId)
  return request({
    url: '/admin/selectAnalysis',
    method: 'post',
    data: params
  })
}
/**
 * 查询商品数据库存销量
 * @param {String} year
 * @param {String} month
 * @param {String} day
 * @param {Number} shopId
 */
export const getGoodsSale = (year, month, day, shopId) => {
  const params = new URLSearchParams()
  if(year)params.append('year', year)
  if(month)params.append('month', month)
  if(day)params.append('day', day)
  if(shopId)params.append('shopId', shopId)
  return request({
    url: '/admin/selectSales',
    method: 'post',
    data: params
  })
}
/**
 * 查询年度盈亏曲线
 * @param {String} year
 * @param {Number} shopId
 */
export const getIncomeLoss = (year,shopId) => {
  const params = new URLSearchParams()
  if(year)params.append('year', year)
  if(shopId)params.append('shopId', shopId)
  return request({
    url: '/admin/selectProfitLoss',
    method: 'post',
    data: params
  })
}
/**
 * 查询复购品类排名
 * @param {String} year
 * @param {String} month
 * @param {String} day
 * @param {Number} shopId
 */
export const getFrequency = (year, month, day, shopId) => {
  const params = new URLSearchParams()
  if(year)params.append('year', year)
  if(month)params.append('month', month)
  if(day)params.append('day', day)
  if(shopId)params.append('shopId', shopId)
  return request({
    url: '/admin/selectGoodsNumber',
    method: 'post',
    data: params
  })
}
/**
 * 查询复购频次
 * @param {String} year
 * @param {String} month
 * @param {String} day
 * @param {Number} shopId
 */
export const getBuyCount = (year, month, day, shopId) => {
  const params = new URLSearchParams()
  if(year)params.append('year', year)
  if(month)params.append('month', month)
  if(day)params.append('day', day)
  if(shopId)params.append('shopId', shopId)
  return request({
    url: '/admin/selectBuyCount',
    method: 'post',
    data: params
  })
}
