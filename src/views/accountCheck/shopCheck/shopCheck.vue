<template>
  <div>
    <breadcrumb>
      <el-button type="primary" @click="exportHandle">导出</el-button>
    </breadcrumb>
    <div style="display:flex;flex-direction:row;">
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
        <el-button type="primaryX" size="mini">筛选</el-button>
        <el-button type="info" size="mini">清空</el-button>
      </div>
    </div>
    <div style="display:flex;flex-direction:row;">
      <p>店铺名称：{{this.shopName}}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <p>对账时间：</p>
      <p style="position:absolute;right:10px;">当前采购金额：{{purchaseAmount[0]/100}}</p>
    </div>
    <el-table
        :data="tableData"
        :header-cell-style="{   }"
        center
        stripe
      >
        <el-table-column label="订单时间"  prop="createTime" ></el-table-column>
        <el-table-column label="订单编号" prop="orderNo"> </el-table-column>
        <el-table-column label="订单店铺" prop="name"></el-table-column>
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
            >查看详情</el-button>
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
import {getOrder, orderDetail} from '@/api/collectShop/order.js'
import Breadcrumb from '@/components/Breadcrumb'
import hint from '@/components/Hint'
import { getAllShop } from '@/api/shop.js'
export default {
  components:{
    Breadcrumb,
    hint
  },
  data() {
    return{
      shopList:[],
      shop:'',
      shopName:'',
      shopId:1,
      tableData:[],
      exportDialog:false,
      total:0,
      pageSize:10,
      pageNum:1,
      purchaseAmount:[],
    }
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
    // 查询所有店铺
    getAllShopList() {
      getAllShop().then(res => {
        this.shopList = res.info
      }).catch(err => {
        console.log(err)
        this.$message.error('查询店铺出错')
      })
    },
    // 查询订单列表
    getOrderList() {
      let data = {}
      // data.orderNo = this.orderNo
      data.pageNum = this.pageNum
      data.pageSize = this.pageSize
      data.states = this.states
      data.year = this.yearPro
      data.month= this.monthPro
      data.day = this.dayPro
      data.type = this.type
      data.param = this.params
      getOrder(data).then(res => {
        if(res.status === 1){
          this.purchaseAmount = res.info.records[0].purchaseAmount
          this.tableData = res.info.records
          this.total = res.info.totalrecord
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询订单出错！')
      })
    },
    // 导出
    exportHandle() {
      this.exportDialog = true
    },
    handleConfirmExport(){

    },
    handleSizeChange(e){
      this.pageSize = e
    },
    handleCurrentChange(e){
      this.pageNum = e
    },
    viewDetails(index,row){
      this.$router.push({name:'shopCheckDetail', params:row})
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
