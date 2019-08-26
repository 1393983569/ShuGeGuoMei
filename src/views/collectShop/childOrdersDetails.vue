<template>
  <div class="box-margin">
    <HeadButton>
      <el-button type="primary" style=" margin-left: 10px" @click="sendOrders">派单</el-button>
      <el-button type="danger" @click="deleteOrder">删除</el-button>
    </HeadButton>
    <div>子订单编号：</div>
    <div>
      子订单时间：
    </div>
    <div>
      订单店铺：
    </div>
    <div>
      子订单供应商：
    </div>
    <!-- 循环体 -->
    <div>
      <div style="margin-bottom: 10px">
        <span>
          子订单明细：
        </span>
      </div>
      <el-row>
        <el-col :span="2">
          <div>
            &nbsp;
          </div>
        </el-col>
        <el-col :span="20">
          <!-- <div v-for="item in orderDetailCateList" style="margin:0px;"> -->
          <div style="margin:0px;">
            <p style="text-align: left;font-weight: bold;margin-top:20px;">
              <!-- {{item[0].categoryOneName}} -->
            </p>
            <el-table
              style="display: inline-block;"
              :data="dataTable"
              :header-cell-style="{   }"
              show-summary
              :summary-method="getSummaries"
              center
            >
              <el-table-column prop="goodsName" label="商品名称"/>
              <el-table-column prop="id" label="商品ID"/>
              <el-table-column prop="standards" label="规格"/>
              <el-table-column prop="unit" label="单价"/>
              <el-table-column prop="detailAmount" label="下单数量">
                <template slot-scope="scope" style="align-item:center;">
                  <el-input v-model="scope.row.detailAmount" class="table-input" style="width:80px;"/>&nbsp;&nbsp;
                  <svg-icon icon-class="revise" style="font-size:24px;line-height:57px;"  />
                </template>
              </el-table-column>
              <el-table-column prop="money" label="金额">
                <template slot-scope="scope">
                  <!-- {{scope.row.money/100}} -->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="total">
            <div>订单总金额：</div>
            <div class="rightItem">￥{{temNum}}</div>
          </div>
        </el-col>
      </el-row>
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
      orderDetailCateList:[],
      temNum:0,
      dataTable:[{
        detailAmount:300
      }],
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
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '小计金额:'
          return
        }
        const values = data.map(item => {
          if (column.property === 'money' && item[column.property]) {
            return Number(item[column.property])
          }
        })
        if (!values.every(value => isNaN(value))) {
          const sun = sumList(values)
          sums[index] = `￥${sun/100}`
        } else {
          sums[index] = ''
        }
      })
      return sums
    }
  }
}
</script>

<style scoped>
  .box-margin > div{
    margin-bottom: 20px;
  }
  .total{
    height: 39px;
    width: 100%;
    background-color: rgba(204, 204, 204, 1);
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0);
    display:flex;
    flex-direction: row;
    align-items: center;
    padding:10px;
    justify-content:space-between;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
    font-weight:bold;
  }
  .rightItem{
    margin-right:11%;
  }
  .table-input{
    color:red;
    border: none;
  }
</style>
