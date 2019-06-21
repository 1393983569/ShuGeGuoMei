<template>
  <el-table
    :data="tableData"
    :header-cell-style="{background:'#f0f2f3',   }"
    center
    stripe
  >
    <el-table-column
      label="角色名称">
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="180"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="warning"
          @click="viewDetails(scope.$index, scope.row)">查看权限</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'jurisdiction',
    data () {
      return{
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      // 查看详情
      viewDetails(index, row) {
        this.$router.push({
          name: 'particulars',
          params: {
            row: row
          }
        })
      },
      // 修改
      handleEdit(index, row) {
        this.$router.push({
          name: 'addAndEdit',
          params: {
            row: row
          }
        })
      }
    },
    mounted () {

    }
  }
</script>

<style scoped>

</style>
