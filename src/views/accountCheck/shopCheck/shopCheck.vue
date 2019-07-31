<template>
  <div>
    <breadcrumb>
      <el-button type="primary" @click="exportHandle">导出</el-button>
    </breadcrumb>
    <div style="display:flex;flex-direction:row;">
      <div>
        店铺：
        <el-select v-model="shopId" placeholder="请选择" size="mini" style="width:140px;">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div style="position:absolute;right:10px;">
        <el-button type="primaryX" size="mini">筛选</el-button>
        <el-button type="info" size="mini">清空</el-button>
      </div>
    </div>
    <div style="display:flex;flex-direction:row;">
      <p>店铺名称：</p>
      <p>对账时间：</p>
      <p style="position:absolute;right:10px;">当前采购金额：200000000</p>
    </div>
    <el-table :data="TableDta">
      <el-table-column prop="orderTime" label="订单时间"/>
      <el-table-column prop="orderNum" label="订单编号"/>
      <el-table-column prop="amount" label="商品数量"/>
      <el-table-column prop="orderMoney" label="订单金额（元）"/>
      <el-table-column prop="orderType" label="订单类型"/>
      <el-table-column prop="orderState" label="订单状态"/>
      <el-table-column prop="sunOrderAmount" label="子订单数"/>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="handleDetail(scope.row)">查询详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :page-sizes="[10, 15]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
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
      shopId:'',
      TableDta:[
        {
          orderTime:'2019-7-29',
          orderNum: '123456',
          amount:'50',
          orderMoney:'3000.00',
          orderType:'采购',
          orderState:'已收货',
          sunOrderAmount:'15',
        },
        {
          orderTime:'2019-7-29',
          orderNum: '123456',
          amount:'50',
          orderMoney:'3000.00',
          orderType:'采购',
          orderState:'已收货',
          sunOrderAmount:'15',
        },
        {
          orderTime:'2019-7-29',
          orderNum: '123456',
          amount:'50',
          orderMoney:'3000.00',
          orderType:'采购',
          orderState:'已收货',
          sunOrderAmount:'15',
        },
      ],
      exportDialog:false,
      total:0,
      pageSize:10,
      pageNum:1,
    }
  },
  mounted() {
    this.getAllShopList()
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
    handleDetail(row){
      this.$router.push({name:'shopCheckDetail'})
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
