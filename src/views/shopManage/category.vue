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
      <el-table-column prop="id" label="一级品类ID">
        <template slot-scope="scope">
          <el-checkbox>{{ scope.row.id }}</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="names" label="二级品类" />
      <el-table-column prop="ids" label="二级品类ID">
        <template slot-scope="scope">
          <el-checkbox>{{ scope.row.ids }}</el-checkbox>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getCategory } from '@/api/category.js'
export default {
  data() {
    return {
      categoryTable: [],
      spanCateTable: []
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      if (columnIndex === 1) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    getCategoryList() {
      this.spanCateTable = []
      this.categoryTable = []
      getCategory().then(res => {
        this.spanCateTable = res.info
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
