// 数组求和
export const sumList = (arr) => {
  return arr.reduce((prev, cur) => {
    if(prev&&cur)
    return !isNaN(prev) + !isNaN(cur)
  }, 0)
}

/**
 * 指定table组件的某个字段求和
 */
export const getSummaries = (param, prop) => {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '小计金额'
      return
    }
    const values = data.map(item => {
      if (column.property === prop && item[column.property]) {
        return Number(item[column.property])
      }
    })
    if (!values.every(value => isNaN(value))) {
      let sun = sumList(values)
      sums[index] = `￥${sun}`
    } else {
      sums[index] = '';
    }
  })
  return sums
}

/**
 * 递归生成页面所对应的按钮
 */
export const getButtonRole = (role) => {
  let list = []
  const recursion = (listValue) => {
    // console.log(listValue, 'lololo........')
    listValue.forEach((item, index) => {
      let data = {}
      if (!item.children) {
        data.name = item.name
        data.checkList = item.checkList
        list.push(data)
      }
      if (item.children) {
        recursion(item.children)
      }
    })
    return list
  }
  return recursion(role)
}

/**
 * 递归生成页面权限
 */
export const getRole = (role) => {
  let list = []
  const recursion = (listValue) => {
    // console.log(listValue, 'list.....')
    listValue.forEach((item, index) => {
      if (item.checkList.length !== 0) {
        // if (item.checkList) {
        if (item.roles) {
          item.roles.forEach(itemx => {
            if (!list.includes(itemx)) {
              list.push(itemx)
            }
          })
        }
      }
      if (item.children) {
        recursion(item.children)
      }
    })
    return list
  }
  return recursion(role)
}
