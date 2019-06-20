// 数组求和
export const sumList = (arr) => {
  return arr.reduce((prev, cur) => {
    return prev + cur
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
