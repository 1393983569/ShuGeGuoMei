<template>
<div>
  <breadcrumb :stateShow="false"></breadcrumb>
  <div style="display: flex; flex-direction: row">
    <pickDate @getPickDate="getPickDate" :yearPro="yearPro" :monthPro="monthPro" :dayPro="dayPro"></pickDate>&nbsp;
    <div>
      类型：<el-select v-model="type" style="width:100px;" placeholder="请选择" size="mini">
        <el-option
          v-for="item in typeList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      订单状态：<el-select v-model="status" style="width:100px;" placeholder="请选择" size="mini">
        <el-option
          v-for="item in statusList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div style="position: absolute; right: 5px;">
      <el-button size="mini" @click="searchOrder" v-if="buttonList.includes('操作')" type="primary">筛选</el-button>
      <el-button size="mini"v-else disabled>筛选</el-button>
      <el-button size="mini" @click="clearOrder" v-if="buttonList.includes('操作')" type="info">清空</el-button>
      <el-button size="mini" v-else disabled>清空</el-button>
    </div>
  </div>
  <div style="margin-top:5px;margin-bottom:20px;">
    <el-input
      placeholder="请输入订单编号或店铺名称"
      prefix-icon="el-icon-search"
      clearable
      v-model="params" style="width:400px;" size="mini">
    </el-input>
    <el-button size="mini" @click ="handleFind" v-if="buttonList.includes('操作')" >搜索</el-button>
    <el-button size="mini" disabled v-else>搜索</el-button>
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
    <el-table-column label="商品数量" prop="">
      <template slot-scope="scope">
        {{scope.row.goodsAmount[0].goodsAmount}}
      </template>
    </el-table-column>
    <el-table-column label="订单金额(元)" prop="total_money"> </el-table-column>
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
      </template>
    </el-table-column>
    <el-table-column label="子订单数" prop="">
      <template slot-scope="scope">{{scope.row.subOrderCount[0]}}</template>
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
          v-if="buttonList.includes('操作')"
        >查看详情</el-button>
         <el-button
          size="mini"
          type="warning"
          disabled
          v-else
        >查看详情</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="separateBill(scope.$index, scope.row)"
          v-if="buttonList.includes('操作')"
        >拆单</el-button>
        <el-button size="mini" type="primary" v-else disabled>拆单</el-button>
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
</div>
</template>

<script>
import pickDate from '@/components/pickDate'
import {getOrder, orderDetail} from '@/api/collectShop/order.js'
import { get } from 'http';
import breadcrumb from "@/components/Breadcrumb"
export default {
  name: 'orderFormList',
  components:{pickDate, breadcrumb},
  data() {
    return {
      yearPro:'',
      monthPro:'',
      dayPro:'',
      tableData: [],
      input2: '',
      total: 0,
      pageSize:10,
      pageNum: 1,
      orderNo:'',
      status: '',
      type: '',
      typeList:[
        {
          name:'销售',
          id:1
        },
         {
          name:'退货',
          id:2
        },
         {
          name:'采购',
          id:3
        },
         {
          name:'调拨',
          id:4
        }
      ],
      statusList:[
        {
          name:'全部',
          id:''
        },
        {
          name:'未拆单',
          id:0
        },
        {
          name:'已拆单',
          id:1
        },
        {
          name:'已派单',
          id:2
        }
      ],
      params:'',
      buttonList:[]
    }
  },
  beforeRouteEnter (to, form, next) {
   console.log(to)
    next(mv => {
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
  	})
  },
  watch:{
    'params'(e){
      if(!e){
        this.getOrderList()
      }else{
        // 去除参数前后的空格
        this.params = this.Trim(e)
      }
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    Trim(str){
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    getButton(list, name){
      console.log(list, name, 'llllll')
      list.forEach(e => {
        if(e.name === name){
          this.buttonList = e.checkList
        }
      });
    },
    handleFind(){
      this.getOrderList()
    },
    searchOrder(){
      this.getOrderList()
    },
    clearOrder(){
      this.orderNo = ''
      this.status = ''
      this.type = ''
      this.yearPro = ''
      this.monthPro = ''
      this.dayPro = ''
      this.type = ''
      this.getOrderList()
    },
    getPickDate(date){
      date = date+'-'
      let dateArr = date.split('-')
      console.log(dateArr, 'date')
      if(dateArr.length === 2){
        this.yearPro = dateArr[0]
      }else if(dateArr.length === 3) {
        this.yearPro = dateArr[0]
        this.monthPro = dateArr[1]
      }else if(dateArr.length === 4){
        this.yearPro = dateArr[0]
        this.monthPro = dateArr[1]
        this.dayPro = dateArr[2]
      }
    },
    handleSizeChange(e){
      this.pageSize = e
      this.getOrderList()
    },
    handleCurrentChange(e) {
      this.pageNum = e
      this.getOrderList()
    },
    // 查询订单列表
    getOrderList() {
      let data = {}
      data.orderNo = this.orderNo
      data.pageNum = this.pageNum
      data.pageSize = this.pageSize
      data.status = this.status
      data.year = this.yearPro
      data.month= this.monthPro
      data.day = this.dayPro
      data.type = this.type
      data.param = this.params
      getOrder(data).then(res => {
        if(res.status === 1){
          this.tableData = res.info.records
          this.total = res.info.totalrecord
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询订单出错！')
      })
    },
    // 查看详情
    viewDetails(index, row) {
      this.$router.push({
        name: 'orderDetails',
        params: row
      })
      this.$store.state.user.orderObject = row
    },
    // 拆单
    separateBill(index, row) {
      this.$router.push({
        name: 'separateBill',
        params: row
      })
    }
  }
}
</script>

<style scoped>

</style>
