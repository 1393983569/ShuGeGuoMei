import request from '../utils/request'

export const addShop = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    console.log(key, 'key....')
    // if (data[key]) params.append(key, data[key])
  }
  return request({
    url: '/admin/shop/add',
    method: 'post',
    data: params
  })
}
// export const editShop = (data) => {
//   const params = new URLSearchParams()
//   // params.append('id', data.id)
//   // params.append('name', data.name)
//   // params.append('simpleName', data.simpleName)
//   // params.append('imge', data.imge)
//   // params.append('shopownerName', data.shopownerName)
//   // params.append('shopownerPhone', data.shopownerPhone)
//   // params.append('shopownerPassword', data.shopownerPassword)
//   // params.append('cityId', data.cityId)
//   // params.append('countyId', data.countyId)
//   // params.append('detailsAddress', data.detailsAddress)
//   // params.append('area', data.area)
//   // params.append('idcategoryOneId', data.idcategoryOneId)
//   // params.append('categoryTwoId', data.categoryTwoId)
//   // params.append('management', data.management)
//   // params.append(' status', data. status)
//   // params.append('deleteStatus', data.deleteStatus)
//   // return request({
//     url: '/admin/shop/update',
//     method: 'get',
//     data: params
//   })
// }
