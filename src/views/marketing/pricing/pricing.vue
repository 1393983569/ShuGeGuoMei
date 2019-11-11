<template>
  <div>
    <breadcrumb :stateShow="false"></breadcrumb>
    <div style="display:flex;flex-direction:row;align-items:center;margin-bottom:10px;">
      店铺：<el-select size="mini" v-model="shopId" placeholder="请选择" style="width:10%;margin-right:10px;">
        <el-option
          v-for="item in shopList"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <pickDate @getPickDate="getPickDate" :yearPro="yearPro" :monthPro="monthPro" :dayPro="dayPro"></pickDate>
      <!-- <div style="float:right;margin:10px;"> -->
        时间段：<el-time-picker
        size="mini"
          style="width:16%;"
          is-range
          value-format="HH:mm:ss"
          v-model="timeData"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围">
        </el-time-picker>
        <div style="position:absolute;right:10px;">
          <el-button size="mini" type="primary" @click="searchFunction">筛选</el-button>
          <el-button size="mini" type="danger" @click="clearFunction">清除</el-button>
        </div>
      <!-- </div> -->
    </div>
    <el-table
      :data="dataList"
      :header-cell-style="{   }"
      center
      stripe
    >
      <el-table-column
        prop="categoryOneName"
        label="一级品类"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.categoryOneName }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="二级品类"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.categoryTwoName }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="goodsId"
        label="商品ID"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.goodsId }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名称"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.goodsName }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="standards"
        label="规格"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.standards }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="unit"
        label="单位"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.unit }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="computerStock"
        label="库存"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.computerStock }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="零售价"
      >
        <template slot-scope="scope">
          <p>￥{{ scope.row.price/100}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="rate"
        label="折扣率"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.rate/100 }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="折扣价"
      >
        <template slot-scope="scope">
          <p>{{(scope.row.price*scope.row.rate)/10000}}</p>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:5px;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'
import pickDate from '@/components/pickDate'
import breadcrumb from '@/components/Breadcrumb'
import {getAllShop} from '@/api/shop.js'
import { getAllInventoryGoods } from '@/api/marketing/pricing.js'
export default {
  name: 'CollectShop',
  components:{pickDate,breadcrumb},
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 时间选择值
      timeData: ['', ''],
      // 店铺数据
      shopList:[],
      shopId:'',
      dataList: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      yearPro:'',
      monthPro:'',
      dayPro:''
    }
  },
  watch:{
    'timeData'(e){
      console.log(e,  '时间段，，，，，')
    }
  },
  mounted() {
    this.getAllShopFunction()
  },
  methods: {
    // 查询商品定价列表
    getAllInventoryGoods(){
      getAllInventoryGoods(this.pageNum, this.pageSize, this.shopId, this.yearPro, this.monthPro, this.dayPro, this.timeData[0], this.timeData[1]).then(res => {
        if(res.info.records.length>=0){
          this.dataList =  res.info.records
          this.total =res.info.totalrecord
        }else{

        }
      }).catch(err=> {
        this.$message.error('查询商品定价出错！')
      })
    },
    // 查询所有店铺
    getAllShopFunction(){
      getAllShop().then(res => {
        this.shopList[0] = {
          id:'',
          name:'全部'
        }
        res.info.map(item => {
          this.shopList.push(item)
        })
        // this.shopId = this.shopList[1].id
        this.getAllInventoryGoods()
      }).catch(err=> {
        this.$message.error('店铺查询出错！')
      })
    },
    getPickDate(date){
      date = date+'-'
      let dateArr = date.split('-')
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
    searchFunction(){
      this.getAllInventoryGoods()
    },
    // 清空筛选条件
    clearFunction(){
      this.yearPro = ''
      this.monthPro = ''
      this.dayPro = ''
      this.timeData = []
      this.shopId = ''
      this.getAllInventoryGoods()
    },
    // 查看详情
    viewDetails(index, row) {
      this.$router.push({
        name: 'childOrdersDetails',
        params: {
          row: row
        }
      })
    },
    // 派单
    separateBill(index, row) {
      // this.$router.push({
      //   name: 'separateBill',
      //   params: {
      //     row: row
      //   }
      // })
    },
    // 删除
    removeOrder(index, row) {

    },
    handleSizeChange(e) {
      this.pageSize = e
    },
    handleCurrentChange(e) {
      this.pageNum = e
    },
  }
}
</script>

<style scoped>

</style>
