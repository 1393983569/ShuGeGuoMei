import request from '@/utils/request'
/**
 * 创建评分
 * @param {Object} data 评分对象
 */
export const addGrade = (data)=> {
  const params = new URLSearchParams()
  for(const key in data){
    if(key) params.append(key, data[key])
  }
  return request({
    url: '/admin/addFraction',
    method: 'post',
    data: params
  })
}
/**
 * 查询供应商评分
 * @param {Integer} id 供应商id
 */
export const getGrade = (id)=> {
  // const params = new URLSearchParams()
  // params.append('id', id)
  return request({
    url: `/admin/selectAllFraction?id=${id}`,
    method: 'get',
    data: params
  })
}
