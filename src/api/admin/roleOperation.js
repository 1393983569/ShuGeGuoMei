import request from '../../utils/request'

export const getAllMenu = (roleId) => {
  return request({
    url: `/basics/getAllMenu?roleId=${roleId}`,
    method: 'get'
  })
}
