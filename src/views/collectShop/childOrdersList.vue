<template>
  <el-table
    :data="row"
    :header-cell-style="{   }"
    center
    stripe
  >
    <el-table-column
      prop="suborder_no"
      label="子订单编号"
    >
      <template slot-scope="scope">
        <p>{{ scope.row.suborder_no }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="子订单时间"
    >
      <template slot-scope="scope">
        <p>{{ scope.row.create_time }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="providerName"
      label="供应商"
    >
      <template slot-scope="scope">
        <p>{{ scope.row.providerName }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="money"
      label="子订单金额(元)"
    >
      <template slot-scope="scope">
        <p>{{ scope.row.money }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
    >
      <template slot-scope="scope">
        <p v-if="scope.row.status === 0">未拆单</p>
        <p v-else-if="scope.row.status === 1">已拆单</p>
        <p v-else-if="scope.row.status === 2">已派单</p>
        <p v-else>已入库</p>
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
          @click="viewDetails(scope.$index, scope.row)"
        >查看详情</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="sendOrders(scope.$index, scope.row)"
        >派单</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="removeOrder(scope.$index, scope.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ChildOrdersList',
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    // 查看详情
    viewDetails(index, row) {
      this.$router.push({
        name: 'childOrdersDetails',
        params: row
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
  }
}
</script>

<style scoped>

</style>
