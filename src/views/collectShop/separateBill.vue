<template>
  <div class="box-margin">
    <breadcrumb :stateShow ='false'>
      <el-button type="danger" @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSeparateBill" v-if="addButton">保存</el-button>
      <el-button type="primary" v-else disabled>保存</el-button>
    </breadcrumb>
    <div>
      关联供应商：
      <el-select v-model="providerId" placeholder="请选择" style="width: 280px">
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
          <el-table-column type="selection" :selectable="selectable" width="55"/>
        </el-table>
      </div>
    </div>
    <div>子订单金额：￥{{this.subMoney/100}}</div>
  </div>
</template>

<script>
import { getAllProvider } from '@/api/provider.js'
import { orderDetail, separateBill, updateChoose } from '@/api/collectShop/order.js'
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
      providerId:'',
      goodsList:[],
      temObject:{},
      subOrderNo:'',
      subMoney:0,
      orderNo:'',
      goodsArray:[],
      shopId:0,
      orderId:0,
      addButton:false,
    }
  },
  mounted() {
    console.log(this.$route.params, 'pppppp&&&&&&&&&&&&&&&')
    this.shopId = this.$route.params.shopId
    if(JSON.stringify(this.$route.params)!== '{}'){
      this.temObject = this.$route.params
      this.orderNo = this.temObject.orderNo
      this.orderId = this.temObject.id
      this.shopId = this.temObject.shopId
      console.log(this.shopId, 'id......')
      this.getOrderList(this.temObject.orderNo)
    }
    this.getProviders()
  },
  methods: {
    // 查看详情
    viewDetails(index, row) {
      this.$router.push({
        name: 'orderDetails',
        params: row
      })
    },
    // 查询订单商品
    getOrderList(orderNo){
      orderDetail(orderNo).then(res => {
        this.goodsList = res.info[0].orderDetailList
        this.goodsList.forEach(item => {
          if(item.choose ===1){
            this.addButton = true
          }
        })
      }).catch(err => {
        this.$message.error('查询订单商品出错！')
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
    // 分拣派单商品
    handleSelectionChange(val){
      this.subMoney = 0
      this.goodsArray = []
      val.map(item => {
        this.subMoney += item.money
        item.state = true
        this.goodsArray.push(item)
      })
    },
    // 拆单
    handleSeparateBill(){
      console.log()
      let arr = []
      let idArr = []
      this.goodsArray.map(item => {
        idArr.push(item.id)
        let obj = {}
        obj.standards = item.standards
        obj.unit = item.unit
        obj.categoryOneId = item.category_one_id
        obj.money = item.money
        obj.price = item.price
        obj.goodsId = item.id
        obj.goodsName = item.goodsName
        obj.amount = item.detailAmount
        obj.orderId = this.orderId
        obj.orderNo = this.orderNo
        arr.push(obj)
      })
      let list = JSON.stringify(arr)
      // 派单
      console.log(this.shopId, 'shopId......')
      separateBill(this.providerId, list, this.orderId, this.orderNo, this.subMoney, this.shopId).then(res => {
        this.$message.success('拆单成功！')
        this.$router.push({name: 'orderFormList'})
      }).catch(err => {
        this.$message.error('拆单失败！')
      })
      console.log(this.orderId, 'hhhhhh')
      // 派单商品状态修改
      updateChoose(idArr.toString(),this.orderId).then(res => {

      }).catch(err=> {
        console.log(err)
        this.$message.error('派单商品状态修改失败！')
      })
    },
    handleCancel(){
      this.providerId = '',
      this.orderNo =''
      this.subMoney = 0
      this.goodsArray = []
      this.$router.push({
        name: 'orderFormList',
        params:''
      })
    },
    selectable(row){
      console.log(row, 'fffffff')
      if(row.choose === 1){
        console.log(row, 'weixuan//////')
        return true
      }else{
        console.log(row, 'yixuan////')
        return false
      }
    }
  }
}
</script>

<style scoped>
.box-margin > div{
  margin-bottom: 20px;
}
</style>
