import request from '../utils/request'
/**
 * 查询品类
 */
export const getCategory = () => {
  return request({
    url: '/basics/categoryTwo/selectList',
    method: 'get'
  })
}
