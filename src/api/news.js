import request from '../utils/request'
/**
 * 添加消息
 */
export const addNews = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    // console.log(key, 'key....')
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/addMess',
    method: 'post',
    data: params
  })
}
/**
 * 查询消息
 */
export const getNews = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/getAllMess',
    method: 'post',
    data: params
  })
}
/**
 * 删除消息
 */
export const deleteNews = (id) => {
  // const params = new URLSearchParams()
  // for (const key in data) {
  //   if (data[key]) params.append(key, data[key])
  // }
  return request({
    url: `/admin/deleteMess?id=${id}`,
    method: 'get'
    // data: params
  })
}
