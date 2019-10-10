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
    url: `/basics/deleteCategoryOne?id=${id}&categoryOneId=${id}`,
    method: 'get'
  })
}

/**
 * 查询所有一级品类
 */
export const selectAll = () => {
  return request({
    url: `/basics/selectAll`,
    method: 'get'
  })
}

/**
 * 二级品类删除
 * @param id
 */
export const delCategoryTwo = (categoryOneId,categoryTwoId) => {
  return request({
    url: `/basics/delCategoryTwo?categoryOneId=${categoryOneId}&categoryTwoId=${categoryTwoId}`,
    method: 'get'
  })
}

/**
 * 一级品类新建
 * @param id
 * @param name
 */
export const addCategoryOne = (data) => {
  return request({
    url: '/basics/addCategoryOne',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'post'
  })
}

/**
 * 二级品类新建
 * @param data
 */
export const addCategoryTwo = (data) => {
  return request({
    url: '/basics/addCategoryTwo',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'post'
  })
}

/**
 * 二级品类编辑
 * @param data
 */
export const editCategoryTwo = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/basics/editCategoryTwo',
    method: 'post',
    data: params
  })
}

/**
 * 一级品类编辑
 * @param data
 */
export const updateCategoryOne = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/basics/updateCategoryOne',
    method: 'post',
    data: params
  })
}
