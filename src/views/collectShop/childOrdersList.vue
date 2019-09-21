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
        <p>{{ scope.row.money/100 }}</p>
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
        <el-button
          size="mini"
          type="primary"
          v-if="scope.row.status===0"
          @click="sendOrders(scope.row)"
        >派单</el-button>
         <el-button size="mini"
          type="info"
          v-else
          disabled
        >派单</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="removeOrder(scope.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<hint v-model="showDelete" title="删除子订单" text="是否删除该订单？" @confirm="confirmDelete" />
  <!-- <hint v-model="showSend" title="派单确定" text="是否派单确定？" @confirm="confirmSend" /> -->
  <hintSend v-model="showSend" title="派单确定" @confirm="confirmSend" />
</div>
</template>
<script>
import hint from '@/components/Hint'
import hintSend from '@/views/collectShop/hintSend.vue'
import {deleteSubOrder, updateSubOrderStatus} from '@/api/collectShop/order.js'
export default {
  name: 'ChildOrdersList',
  components:{hint, hintSend},
  props: {
    row: {
      type: Array,
      default: () => []
    },
    buttonList: {
      type: Array,
      default: () => []
    },
  },

  data() {
    return {
      buttonArray:[],
      showDelete:false,
      subOrderNo:'',
      subOrderId:'',
      showSend:false,
      fatherId:''
    }
  },
  watch:{
    'buttonList'(e){
      this.buttonArray = e
    }
  },
  mounted() {
    console.log(this.row, 'kkkkkkkk')
    // if(this.row.length === 0){
    //   this.$router.push({
    //     name:'orderFormList'
    //   })
    // }
  },
  methods: {
    // 查看详情
    viewDetails(row) {
      console.log(row, 'row.....')
      this.$router.push({
        name: 'childOrdersDetails',
        params: row
      })
    },
    // 派单
    sendOrders(row) {
      console.log(row, 'row......')
      this.showSend = true
      this.subOrderNo = row.suborder_no
      this.subOrderId = row.id
    },
    confirmSend(){
      let status = 1
      updateSubOrderStatus(this.subOrderId,status).then(res => {
        this.$message.success('派单成功！')
        this.showSend = false
        this.$emit('refresh')
      }).catch(err => {
        this.$message.error('派单失败！')
      })
    },
    // 删除
    removeOrder(row) {
      console.log(row,this.row, 'id......')
      this.subOrderNo = row.suborder_no
      this.subOrderId=row.id
      this.fatherId = this.row.fatherId
      this.showDelete = true
    },
    confirmDelete(){
      deleteSubOrder(this.subOrderId, this.fatherId).then(res => {
        this.$message.success('删除成功！')
        this.showDelete = false
        this.$emit('refresh')
      }).catch(err=> {
        this.$message.error('删除失败！')
      })
    }
  }
}
</script>

<style scoped>

</style>
