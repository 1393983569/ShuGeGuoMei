import request from '../../utils/request'

export const getAllMenu = (roleId) => {
  return request({
    url: `/basics/getAllMenu?roleId=${roleId}`,
    method: 'get'
  })
}

/**
 * 添加权限
 * @param data
 */
export const addMenu = (menu, roleId) => {
  const params = new URLSearchParams()
  params.append('menu', JSON.stringify(menu))
  params.append('roleId', roleId)
  return request({
    url: '/basics/addMenu',
    method: 'post',
    data: params
  })
}

/**
 * 编辑权限
 * @param data
 */
export const editMenu = (menu, roleId) => {
  const params = new URLSearchParams()
  params.append('menu', JSON.stringify(menu))
  params.append('id', roleId)
  return request({
    url: '/basics/editMenu',
    method: 'post',
    data: params
  })
}
