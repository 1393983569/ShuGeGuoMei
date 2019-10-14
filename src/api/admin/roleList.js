import request from '../../utils/request'

export const selectAfter = () => {
  return request({
    url: `/basics/selectAfter?type=1`,
    method: 'get'
  })
}
