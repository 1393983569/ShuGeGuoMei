import request from '../../utils/request'

/**
 * 添加管理员
 * @param data
 */
export const addAdmin = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/addAdmin',
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/json;charset=UTF-8'
    // },
    data: params
  })
}

/**
 * 编辑后台用户
 * @param data
 */
export const editAdmin = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key] ) params.append(key, data[key])
  }
  return request({
    url: '/admin/editAdmin',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param pageNum 页数
 */
export const selectPageAdmin = (pageNum,pageSize,param,roleId) => {
  return request({
    url: `/admin/selectPageAdmin?pageNum=${pageNum}&pageSize=${pageSize}&param=${param}&roleId=${roleId}`,
    method: 'get'
  })
}
/**
 *删除后台用户
 * @param {Integer} id 用户id
 */
export const deleteAdmin = (id) => {
  return request({
    url: `/admin/deleteAdmin?id=${id}`,
    method: 'get'
  })
}
