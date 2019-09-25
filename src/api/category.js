import request from '../utils/request'
/**
 * 查询品类
 */
export const getCategory = () => {
  return request({
    url: '/basics/selectList',
    method: 'get'
  })
}
/**
 * 查询所有一级品类
 */
export const getFirstCategory = () => {
  return request({
    url: '/basics/selectAll',
    method: 'get'
  })
}
/**
 * 查询一级品类下的二级品类
 * @param {int} id 一级品类id
 */
export const getSecondCategory = (id) => {
  return request({
    url: `/basics/selectGetOne?id=${id}`,
    method: 'get'
  })
}

