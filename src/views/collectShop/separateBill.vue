<template>
  <div class="box-margin">
    <breadcrumb>
      <el-button type="danger">取消</el-button>
      <el-button type="primary">保存</el-button>
    </breadcrumb>
    <div>
      关联供应商：
      <el-select v-model="provider" placeholder="请选择" style="width: 280px">
        <el-option
          v-for="item in optionsProvider"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div style="display: flex;width:100%;">
      <div style="display: inline-block; vertical-align: top; width: 100px">
        分拣派单：
      </div>
      <div style="width:60%">
        <el-table
          :data="goodsList"
          :header-cell-style="{   }"
          @selection-change="handleSelectionChange"
          center
          stripe
        >
          <el-table-column label="商品名称" prop="goodsName" ></el-table-column>
          <el-table-column label="商品ID" prop="id" > </el-table-column>
          <el-table-column label="规格" prop="standards" />
          <el-table-column label="单价" prop="price">
            <template slot-scope="scope">
              {{scope.row.price/100}}
            </template>
          </el-table-column>
          <el-table-column label="下单数量" prop="detailAmount" />
          <el-table-column label="金额" prop="money">
            <template slot-scope="scope">
              {{scope.row.money/100}}
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55" />
        </el-table>
      </div>
    </div>
    <div>子订单金额：￥{{this.subMoney/100}}</div>
  </div>
</template>

<script>
import { getAllProvider } from '@/api/provider.js'
import { orderDetail, getSubOrderNo } from '@/api/collectShop/order.js'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'separateBill',
  components: {
    Breadcrumb
  },
  data() {
    return {
      goodsList: [],
      optionsProvider:[],
      provider:'',
      temObject:{},
      subOrderNo:'',
      subMoney:0,
    }
  },
  mounted() {
    console.log(this.$route.params, 'pppppp')
    if(JSON.stringify(this.$route.params)!== '{}'){
      this.temObject = this.$route.params
      this.getOrderList(this.temObject.orderNo)
      // this.getSubOrderNo(this.temObject.orderNo)
    }
    this.getProviders()
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
    // 查询订单商品
    getOrderList(orderNo){
      orderDetail(orderNo).then(res => {
        this.goodsList = res.info[0].orderDetailList
      }).catch(err => {
        this.$message.error('查询订单商品出错！')
      })
    },
    // 拆单-获取子订单编号
    getSubOrderNo(ouderNo){
      getSubOrderNo(ouderNo).then(res => {
        this.subOrderNo = res.info.suborderNo
      }).catch(err => {
        this.$message.error('获取子订单编号出错！')
      })
    },
    // 查询供应商
    getProviders() {
      getAllProvider().then(res => {
        if(res.status === 1) {
          this.optionsProvider = res.info
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleSelectionChange(val){
      console.log(val, '**************val*******')
      this.subMoney = 0
      val.map(item => {
        this.subMoney += item.money
      })
    },
  }
}
</script>

<style scoped>
.box-margin > div{
  margin-bottom: 20px;
}
</style>
