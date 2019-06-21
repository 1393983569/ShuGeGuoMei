<template>
  <div class="box-margin">
    <HeadButton>
      <el-button type="primary" style=" margin-left: 10px" @click="sendOrders">派单</el-button>
      <el-button type="danger" @click="deleteOrder">删除</el-button>
    </HeadButton>
    <div>子订单编号：123153123123123</div>
    <div>
      子订单时间：2019-03-29 20:00
    </div>
    <div>
      订单店铺：万达店
    </div>
    <div>
      子订单供应商：供应商1
    </div>
    <div style="display: flex;">
      <div style="display: inline-block; vertical-align: top; width: 110px">
        子订单明细：
      </div>
      <el-table
        style="display: inline-block;"
        :data="tableData"
        :header-cell-style="{   }"
        show-summary
        :summary-method="getSummaries"
        center
        stripe
      >
        <el-table-column
          prop="name"
          label="商品名称"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.date }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品ID"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.address }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="规格"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.address }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="单价"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.money }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="数量"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="money"
          label="金额"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.money }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getSummaries } from '_u/logic'
import HeadButton from '@/components/HeadButton'
export default {
  name: 'ChildOrdersDetails',
  components: {
    HeadButton
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        money: 1000
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        money: 1000
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        money: 1000
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        money: 1000
      }]
    }
  },
  mounted() {

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
    },
    // 派单
    sendOrders() {

    },
    // 删除
    deleteOrder() {
      // 成功后返回上一级
      this.$router.back()
    },
    // 表格统计规则
    getSummaries(param) {
      return getSummaries(param, 'money')
    }
  }
}
</script>

<style scoped>
  .box-margin > div{
    margin-bottom: 20px;
  }
</style>
