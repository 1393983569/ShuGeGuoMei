import request from '../utils/request'
/**
 * 添加消息
 */
export const addNews = (data) => {
  const params = new URLSearchParams()
  // for (const key in data) {
  //   // console.log(key, 'key....')
  //   if (data[key]) params.append(key, data[key])
  // }
  params.append('shopJson', data.shopJson)
  return request({
    url: `/admin/addMess?title=${data.title}&category=${data.category}&content=${data.content}&deleteStatus=${data.deleteStatus}&shopIds=${data.shopIds}&thumbnail=${data.thumbnail}`,
    // url: '/admin/addMess',
    method: 'post',
    //  headers: {
    //   'content-Type': 'application/json;charset=UTF-8'
    // },
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
