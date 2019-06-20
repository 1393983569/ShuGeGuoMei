<template>
  <el-table
    :data="row"
    :header-cell-style="{background:'#f0f2f3', textAlign: 'center'}"
    center
    stripe
  >
    <el-table-column
      prop="date"
      label="子订单编号">
      <template slot-scope="scope">
        <p>{{ scope.row.date }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="订单编号">
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="订单店铺">
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="订单金额(元)">
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="订单类型">
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="280"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="warning"
          @click="viewDetails(scope.$index, scope.row)">查看详情</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="sendOrders(scope.$index, scope.row)">派单</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="removeOrder(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'collectShop',
    props: {
      row: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return{

      }
    },
    methods: {
      // 查看详情
      viewDetails(index, row) {
        this.$router.push({
          name: 'childOrdersDetails',
          params: {
            row: row
          }
        })
      },
      // 派单
      separateBill(index, row) {
        // this.$router.push({
        //   name: 'separateBill',
        //   params: {
        //     row: row
        //   }
        // })
      },
      // 删除
      removeOrder(index, row) {

      }
    },
    mounted () {

    }
  }
</script>

<style scoped>

</style>
