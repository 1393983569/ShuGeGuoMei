<template>

<div>
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
        <p>{{ scope.row.money?(scope.row.money/100):0 }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
    >
      <template slot-scope="scope">
        <p v-if="scope.row.status === 0">未派单</p>
        <p v-else-if="scope.row.status === 1">已派单</p>
        <p v-else-if="scope.row.status === 2">已收货</p>
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
          @click="viewDetails(scope.row)"
        >查看详情</el-button>
        <!-- <el-button
          size="mini"
          type="primary"
          @click="sendOrders(scope.row)"
        >派单</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="removeOrder(scope.row)"
        >删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import hint from '@/components/Hint'
import {getOrder, orderDetail} from '@/api/collectShop/order.js'
import hintSend from '@/views/collectShop/hintSend.vue'
import {deleteSubOrder, updateSubOrderStatus} from '@/api/collectShop/order.js'
export default {
  name: 'ChildOrdersList',
  components:{hint, hintSend},
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      showDelete:false,
      subOrderNo:'',
      showSend:false,
    }
  },
  mounted() {
    // console.log(this.row, 'kkkkkkkk')
    // if(this.row.length === 0){
    //   this.$router.push({
    //     name:'orderFormList'
    //   })
    // }
  },
  methods: {
    // 查看详情
    viewDetails(row) {
      this.$router.push({
        name: 'childShopCheckDetail',
        params: row
      })
    },
    // 派单
    sendOrders(row) {
      this.showSend = true
      this.subOrderNo = row.suborder_no
    },
    confirmSend(){
      let status = 1
      updateSubOrderStatus(row.suborder_no,status).then(res => {
        this.$message.success('派单成功！')
        this.showSend = false
      }).catch(err => {
        this.$message.error('派单失败！')
      })
    },
    // 删除
    removeOrder(row) {
      this.subOrderNo = row.suborder_no
      this.showDelete = true
    },
    confirmDelete(){
      deleteSubOrder().then(res => {
        this.$message.success('删除成功！')
        this.showDelete = false
      }).catch(err=> {
        this.$message.error('删除失败！')
      })
    }
  }
}
</script>

<style scoped>

</style>
