import request from '../../utils/request'

/**
 * 查询一级二级所有品类
 */
export const getSecondCategory = () => {
  return request({
    url: `/basics/selectList`,
    method: 'get'
  })
}

/**
 * 一级品类删除
 * @param id
 */
export const deleteCategoryOne = (id) => {
  return request({
    url: `/basics/deleteCategoryOne?id=${id}`,
    method: 'get'
  })
}

/**
 * 二级品类删除
 * @param id
 */
export const delCategoryTwo = (id) => {
  return request({
    url: `/basics/delCategoryTwo?id=${id}`,
    method: 'get'
  })
}
