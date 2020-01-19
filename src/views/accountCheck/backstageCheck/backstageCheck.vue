<template>
  <div>
    <breadcrumb :stateShow ='false'>
      <el-button size="mini" type="primary" @click="exportHandle" v-if="bottonList.includes('操作'||'查看')">导出</el-button>
      <el-button size="mini" type="primary" v-else>导出</el-button>
    </breadcrumb>
    <div style="display:flex;flex-direction:row;">
      <yearMonthPick @getPickDate="handlePickDate" :stateShow="stateShow"/>&nbsp;&nbsp;&nbsp;
      <div>
        店铺：
        <el-select v-model="shop" placeholder="请选择" size="mini" style="width:140px;">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`">
          </el-option>
        </el-select>
      </div>
      <div style="position:absolute;right:10px;">
        <el-button type="primaryX" size="mini" @click="search" v-if="bottonList.includes('操作'||'查看')">筛选</el-button>
        <el-button type="primaryX" size="mini" v-else disabled>筛选</el-button>
        <el-button type="info" size="mini" @click="clear" v-if="bottonList.includes('操作'||'查看')">清空</el-button>
        <el-button type="info" size="mini" v-else>清空</el-button>
      </div>
    </div>
    <div style="display:flex;flex-direction:row;justify-content:space-between;width:100%;">
      <p>店铺名称：{{shopName}}</p>
      <p>对账时间：<span v-if="year">{{year}}年</span><span v-if="month">{{month}}月</span></p>
      <p>当月采购金额：<span v-if="purchaseAmount[0]">{{purchaseAmount[0]/100}}</span></p>
      <p>当月后台成本：<span v-if="cost[0]">{{cost[0]/100}}</span></p>
      <p>当月后台利润：<span v-if="cost[0]&&purchaseAmount[0]">{{purchaseAmount[0]/100-cost[0]/100}}</span></p>
    </div>
    <el-table
        v-loading="loadingTable"
        :data="tableData"
        :header-cell-style="{   }"
        center
        stripe
      >
        <el-table-column label="订单时间"  prop="createTime" ></el-table-column>
        <el-table-column label="订单编号" prop="orderNo"> </el-table-column>
        <el-table-column label="商品数量" prop="name">
          <template slot-scope="scope">
            {{scope.row.goodsAmount[0].goodsAmount}}
          </template>
        </el-table-column>
        <el-table-column label="订单金额(元)" prop="">
          <template slot-scope="scope">{{scope.row.total_money/100}}</template>
        </el-table-column>
        <el-table-column label="订单类型" prop="type">
          <template slot-scope="scope">
            <p v-if="scope.row.type ===1">销售</p>
            <p v-else-if="scope.row.type===2">退货</p>
            <p v-else-if="scope.row.type===3">采购</p>
            <p v-else>调拨</p>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" prop="states">
          <template slot-scope="scope">
            <p v-if="scope.row.status ===0">未拆单</p>
            <p v-else-if="scope.row.status===1">已拆单</p>
            <!-- <p v-else-if="scope.row.status===2">已派单</p>
            <p v-else>已入库</p> -->
          </template>
        </el-table-column>
        <el-table-column label="子订单数" prop="">
          <template slot-scope="scope">{{scope.row.subOrderCount[0]}}</template>
        </el-table-column>
        <el-table-column label="订单成本（元）" prop="orderCost">
          <template slot-scope="scope">{{scope.row.orderCost[0]/100}}</template>
        </el-table-column>
        <el-table-column label="订单利润（元）" prop="">
          <template slot-scope="scope">{{(scope.row.total_money-scope.row.orderCost[0])/100}}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="viewDetails(scope.$index, scope.row)"
              v-if="bottonList.includes('操作'||'查看')"
            >查看详情</el-button>
            <el-button size="mini" type="warning" v-else disabled>查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <div>
      <el-dialog
          :show-close="false"
          title="导出对账单"
          :close-on-click-modal="false"
          :visible.sync="exportDialog"
          width="30%"
          center
          class="dialogCustom"
        >
          <div class="dialogBorder">
            <el-button>分享H5</el-button>
          </div>
          <div slot="footer" class="dialog-footer botton">
            <div style="border-right: 1px #DDDDDD solid"  @click="exportDialog = false">
              取消
            </div>
            <div @click="handleConfirmExport">
              确定
            </div>
          </div>
        </el-dialog>
    </div>
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import yearMonthPick from '../yearMonthPick.vue'
import Breadcrumb from '@/components/Breadcrumb'
import hint from '@/components/Hint'
import { getAllShop } from '@/api/shop.js'
import {getOrder, orderDetail} from '@/api/collectShop/order.js'
export default {
  components:{
    Breadcrumb,
    hint,
    yearMonthPick
  },
  data() {
    return{
      loadingTable: false,
      // 订单成本
      orderCost:[],
      // 后台成本
      cost:[],
      // 采购金额
      purchaseAmount:[],
      // 店铺
      shopList:[],
      shop:'',
      shopName:'',
      shopId:'',
      // 列表数据
      tableData:[],
      exportDialog:false,
      // 分页
      total:0,
      pageSize:10,
      pageNum:1,
      // 年月数据
      stateShow:false,
      year:'',
      month:'',
      bottonList:[]
    }
  },
  beforeRouteEnter (to, form, next) {
    next(mv => {
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
    })
  },
  watch:{
    'shop'(e){
      if(e){
       let arr = []
       arr = e.split(':')
       this.shopId = arr[0]
       this.shopName = arr[1]
      }
    },
  },
  mounted() {
    this.getAllShopList()
    this.getOrderList()
  },
  methods:{
    getButton(list, name) {
      list.forEach(item => {
        if (item.name === name) {
          this.bottonList = item.checkList
        }
      })
      // console.log(this.bottonList)
    },
    // 时间选择器
    handlePickDate(date){
      this.stateShow = false
      date = date+'-'
      let dateArr = date.split('-')
      if(dateArr.length === 2){
        this.year = dateArr[0]
        this.month = ''
      }else if(dateArr.length === 3) {
        this.year = dateArr[0]
        this.month= dateArr[1]
      }
    },
    // 查询所有店铺
    getAllShopList() {
      getAllShop().then(res => {
        this.shopList[0] ={
          id:'',
          name:'全部'
        }
         res.info.map(item => {
           this.shopList.push(item)
         })
      }).catch(err => {
        console.log(err)
        this.$message.error('查询店铺出错')
      })
    },
    // 查询订单列表
    getOrderList() {
      this.loadingTable = true
      let data = {}
      // data.orderNo = this.orderNo
      data.pageNum = this.pageNum
      data.pageSize = this.pageSize
      data.states = this.states
      data.year = this.year
      data.month= this.month
      data.shopId = this.shopId
      data.type = this.type
      data.param = this.params
      getOrder(data).then(res => {
        this.loadingTable = false
        if(res.status === 1){
          if(res.info.records.length>0){
            this.tableData = res.info.records
            this.total = res.info.totalrecord
            this.purchaseAmount=this.tableData[0].purchaseAmount
            this.cost=this.tableData[0].cost
            this.orderCost=this.tableData[0].orderCost
          }else{
            this.$message.info('暂无数据！')
            this.tableData = []
            this.total = res.info.totalrecord
          }
        }
      }).catch(err => {
        this.loadingTable = false
        console.log(err)
        this.$message.error('查询订单出错！')
      })
    },
    // 筛选
    search(){
      this.getOrderList()
    },
    // 清空
    clear(){
      this.stateShow= true
      this.month = ''
      this.year = ''
      this.shop=''
      this.shopId=''
      this.shopName = ''
      this.purchaseAmount = [0]
      this.getOrderList()
    },
    // 导出
    exportHandle() {
      this.exportDialog = true
    },
    handleConfirmExport(){

    },
    handleSizeChange(e){
      this.pageSize = e
      this.getOrderList()
    },
    handleCurrentChange(e){
      this.pageNum = e
      this.getOrderList()
    },
    viewDetails(index, row){
      this.$router.push({name:'backstageCheckDetail', params:row})
      this.$store.state.user.orderObject = row
    }
  }
}
</script>
<style lang="scss" scoped>
  .botton {
    display: flex;
    > div{
      flex: 1;
      display: inline-block;
      text-align: center;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      &:active{
        background-color: #DDDDDD;
      }
    }
  }
  .dialogBorder{
    text-align: center;
    border-top: 1px #DDDDDD solid;
    border-bottom: 1px #DDDDDD solid;
    padding: 60px 20px;
  }
</style>
