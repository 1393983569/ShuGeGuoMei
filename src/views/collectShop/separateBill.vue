<template>
  <div class="box-margin">
    <breadcrumb :stateShow ='false'>
      <el-button size="mini" type="primary" @click="handleSeparateBill" v-if="addButton">保存</el-button>
      <el-button size="mini" type="primary" v-else disabled>保存</el-button>
      <el-button size="mini" type="warning" @click="handleCancel">取消</el-button>
    </breadcrumb>
    <div>
      关联供应商：
      <el-select v-model="providerId" clearable placeholder="请选择" style="width: 280px">
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
          :data="dataTable"
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
          <el-table-column prop="" label="状态">
            <template slot-scope="scope">
              <p v-if="scope.row.choose===0">已派</p>
              <p v-else>未派</p>
            </template>
          </el-table-column>
          <el-table-column v-if="ifOpen"  type="selection" :selectable="selectable" width="55"/>

        </el-table>
      </div>
    </div>
    <div>子订单金额：￥{{this.subMoney/100}}</div>
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'
import { getAllProvider } from '@/api/provider.js'
import { orderDetail, separateBill, updateChoose } from '@/api/collectShop/order.js'
import {getSupplyGoods} from '@/api/collectShop.js'
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
      temObject:{},
      subOrderNo:'',
      subMoney:0,
      orderNo:'',
      goodsArray:[],
      shopId:0,
      orderId:0,
      addButton:false,
      // 商品是否可选
      ifOpen:false,
      currentGoodsList:[],
      dataTable:[],
    }
  },
  mounted() {
    this.shopId = this.$route.params.shopId
    if(JSON.stringify(this.$route.params)!== '{}'){
      this.temObject = this.$route.params
      this.orderNo = this.temObject.orderNo
      this.orderId = this.temObject.id
      this.shopId = this.temObject.shopId
      this.getOrderList(this.temObject.orderNo)
    }
    this.getProviders()
  },
  watch:{
    'providerId'(e){
      this.ifOpen = false
      if(e){
        this.ifOpen = true
        this.getSupplyGoodsFunction(e)
      }else{
        this.ifOpen = false
        this.dataTable = this.goodsList
      }
    }
  },
  methods: {
    getSupplyGoodsFunction(id){
      this.dataTable = []
      getSupplyGoods(id).then(res => {
        if(res.info.length>0){
          this.currentGoodsList = res.info
          for(let i= 0;i<this.goodsList.length;i++){
            for(let j=0;j<this.currentGoodsList.length;j++){
              if(this.goodsList[i].id === this.currentGoodsList[j].goodsId){
                this.dataTable.push(this.goodsList[i])
                console.log(this.currentGoodsList[j].goodsId)
                continue
              }else{
                continue
              }
            }
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
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
        this.dataTable = res.info[0].orderDetailList
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
      let arr = []
      let idArr = []
      console.log(this.goodsArray, 'goodsArr....')
      return
      this.goodsArray.map(item => {
        idArr.push(item.id)
        let obj = {}
        obj.standards = item.standards
        obj.unit = item.unit
        obj.categoryOneId = item.category_one_id

        obj.money = item.money
        obj.price = item.price
        obj.amount = item.detailAmount

        obj.goodsId = item.id
        obj.goodsName = item.goodsName
        obj.orderId = this.orderId
        obj.orderNo = this.orderNo
        arr.push(obj)
      })
      let list = JSON.stringify(arr)
      // 派单
      separateBill(this.providerId, list, this.orderId, this.orderNo, this.subMoney, this.shopId).then(res => {
        this.$message.success('拆单成功！')
        this.$router.push({name: 'orderFormList'})
      }).catch(err => {
        this.$message.error('拆单失败！')
      })
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
    selectable(row,index){
      if(row.choose===1){
        return true
      }else{
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
