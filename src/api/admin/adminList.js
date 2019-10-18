import request from '../../utils/request'

/**
 * 添加管理员
 * @param data
 */
export const addAdmin = (data) => {
  const params = new URLSearchParams()
  // if(data.id)params.append('id', data.id)
  if(data.name)params.append('name', data.name)
  if(data.password)params.append('password', data.password)
  if(data.mobile)params.append('mobile', data.mobile)
  if(data.roleId)params.append('roleId', data.roleId)
  if(data.type)params.append('type', data.type)
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
  if(data.id)params.append('id', data.id)
  if(data.name)params.append('name', data.name)
  if(data.password)params.append('password', data.password)
  if(data.mobile)params.append('mobile', data.mobile)
  if(data.roleId)params.append('roleId', data.roleId)
  if(data.type)params.append('type', data.type)
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
    url: `/admin/selectPageAdmin?pageNum=${pageNum}&pageSize=${pageSize}&param=${param}&roleId=${roleId}&type=1`,
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
/**
 * 修改用户头像
 * @param {Intger} id 用户id
 * @param {String} image 头像地址
 */
export const editImage = (id,image) => {
  const params = new URLSearchParams()
  if(id) params.append('id', id)
  if(image) params.append('image', image)
  return request({
    url: `/admin/editImage`,
    method: 'post',
    data: params
  })
}
