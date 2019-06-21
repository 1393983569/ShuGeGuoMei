<template>
  <el-table
    :data="tableData"
    :header-cell-style="{  textAlign: 'center'}"
    center
    stripe
  >
    <el-table-column
      label="订单时间">
      <template slot-scope="scope">
        <p>{{ scope.row.date }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="订单编号">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="订单店铺">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="订单金额(元)">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="订单类型">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="订单状态">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="子订单数">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
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
          @click="viewDetails(scope.$index, scope.row)">查看详情</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="separateBill(scope.$index, scope.row)">拆单</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'orderFormList',
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
          name: 'orderDetails',
          params: {
            row: row
          }
        })
      },
      // 拆单
      separateBill(index, row) {
        this.$router.push({
          name: 'separateBill',
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
