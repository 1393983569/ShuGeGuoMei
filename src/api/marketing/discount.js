import request from '@/utils/request'
/**
 * 添加折扣
 * @param {Object} data 折扣对象
 */
export function addDiscount(data) {
  // console.log(data, 'js......')
  const params = new URLSearchParams()
  params.append('frequency',JSON.stringify(data.obj.frequency))
  params.append('member',JSON.stringify(data.obj.member))
  params.append('powerIndex',JSON.stringify(data.obj.powerIndex))
  params.append('profit',JSON.stringify(data.obj.profit))
  params.append('profitMargin',JSON.stringify(data.obj.profitMargin))
  params.append('purchasing',JSON.stringify(data.obj.purchasing))
  params.append('salesVolume',JSON.stringify(data.obj.salesVolume))
  params.append('stock',JSON.stringify(data.obj.stock))
  return request({
    url:`/admin/addDiscount?name=${data.name}&shopId=${data.shopId}&discountPackageGoods=${data.discountPackageGoods}`,
    method: 'post',
    data:params,
  })
}
/**
 * 编辑折扣
 * @param {Object} data 折扣对象
 */
export function editDiscount(data) {
  const params = new URLSearchParams()
  params.append('frequency',JSON.stringify(data.obj.frequency))
  params.append('member',JSON.stringify(data.obj.member))
  params.append('powerIndex',JSON.stringify(data.obj.powerIndex))
  params.append('profit',JSON.stringify(data.obj.profit))
  params.append('profitMargin',JSON.stringify(data.obj.profitMargin))
  params.append('purchasing',JSON.stringify(data.obj.purchasing))
  params.append('salesVolume',JSON.stringify(data.obj.salesVolume))
  params.append('stock',JSON.stringify(data.obj.stock))
  return request({
    url: `/admin/editDiscount?id=${data.id}&discountId=${data.discountPackageId}&discountPackageId=${data.discountPackageId}&name=${data.name}&shopId=${data.shopId}&discountPackageGoods=${data.discountPackageGoods}`,
    method: 'post',
    data:params,
  })
}
/**
 * 查询折扣包详情
 * @param {Integer} id 折扣包id
 */
export function discountDetail(id) {
  const params = new URLSearchParams()
  params.append('id', id)
  return request({
    url: '/admin/findDiscount',
    method: 'post',
    data:params
  })
}
export function deleteDiscount(id) {
  return request({
    url: `/admin/deleteDiscount?id=${id}`,
    method: 'get',
  })
}
/**
 * 修改折扣状态
 * @param {Integer} id 折扣id
 * @param {Integer} status 状态
 */
export function editStatus(id, status) {
  let params = new URLSearchParams()
  params.append('id', id)
  params.append('status', status)
  return request({
    url: '/admin/editStatus',
    method: 'post',
    data:params
  })
}
/**
 * 分页查询折扣
 * @param {Integer} pageNum 页数
 * @param {Integer} pageSize 记录数
 * @param {Integer} shopId 店铺id
 * @param {Integer} status 状态
 */
export function queryDiscount(pageNum,pageSize,shopId, status) {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('pageSize', pageSize)
  if(shopId)params.append('shopId', shopId)
  if(status ===0||status ===1)params.append('status', status)
  return request({
    url: '/admin/queryDiscount',
    method: 'post',
    data:params
  })
}
/**
 * 一个折扣下的商品查询
 * @param {Integer} id 一级品类id
 * @param {Integer} discountId 折扣包id
 */
export function getDiscountGoods (id, discountId) {
  let params = new URLSearchParams()
  params.append("categoryOneId", id)
  params.append("discountId", discountId)
  return request({
    url: '/admin/selectCategoryGoods',
    method: 'post',
    data:params
  })
}
/**
 * 查询每个商品的折扣
 * @param {Integer} discountId 折扣包id
 * @param {Integer} goodsId 商品id
 * @param {Integer} shopId 店铺id
 */
export function getDiscountTable (discountId, goodsId,shopId) {
  let params = new URLSearchParams()
  params.append("discountId", discountId)
  params.append("goodsId", goodsId)
  params.append("shopId", shopId)
  return request({
    url: '/admin/findDiscountPackage',
    method: 'post',
    data:params
  })
}
