<template>
  <div>
    <el-table
      :header-cell-style="tableHeaderColor"
      :data="categoryTable"
      center
      border
      :span-method="arraySpanMethod"
    >
      <el-table-column prop="name" label="一级品类" />
      <el-table-column prop="id" label="一级品类ID" />
      <el-table-column prop="names" label="二级品类" />
      <el-table-column prop="ids" label="二级品类ID" />
    </el-table>
  </div>
</template>
<script>
import { getCategory } from '@/api/category.js'
// import { once } from 'events';
// import { resolve } from 'dns';
export default {
  data() {
    return {
      categoryTable: [],
      seconds: [],
      temp: []
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex, 'row...')
      if (columnIndex === 0) {
        // let num = 0
        // // console.log(row,'0,row')
        // for(let i in this.temp) {
        //   if(this.temp[i].name === row.name) {
        //     console.log(row, i ,'row')
        //     num += 1
        //   }
        // }
      }
    },
    getCategoryList() {
      this.categoryTable = []
      getCategory().then(res => {
        if (res.status === 1) {
          console.log(res.info, 'hhhh')
          this.temp = res.info
          for (const key in res.info) {
            const secondList = res.info[key].seconds
            if (secondList.length > 0) {
              for (const i in secondList) {
                const list = {
                  id: res.info[key].id,
                  name: res.info[key].name,
                  ids: secondList[i].id,
                  names: secondList[i].name
                }
                this.categoryTable.push(list)
              }
            } else {
              this.categoryTable.push(res.info[key])
            }
          }
        }
      }).catch()
    },
    tableHeaderColor() {}

  }
}
</script>
