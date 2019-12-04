<template>
  <div>
    <div class="records-container border">
      <el-table :data="dataList">
        <el-table-column prop="goodsName" label="商品名称"/>
        <el-table-column prop="id" label="商品ID"/>
        <el-table-column prop="unit" label="单位"/>
        <el-table-column prop="price" label="单价">
          <template slot-scope="scope">
            {{scope.row.price/100}}
          </template>
        </el-table-column>
        <el-table-column prop="account" label="折扣">
          <template slot-scope="scope">
            {{scope.row.rate/100}}
          </template>
        </el-table-column>
        <el-table-column prop="detailAmount" label="数量"/>
        <el-table-column prop="money" label="金额">
          <template slot-scope="scope">
            {{scope.row.money/100}}
          </template>
        </el-table-column>
      </el-table>
      <div class="total">
        <div>
          <div class="flex-row" style="margin-left:30px;"><p>合计：</p><p>￥{{currentObject.totalMoney?(currentObject.totalMoney/100):'0'}}</p></div><hr class="border" style="margin-left:20px;margin-right:20px;"/>
          <div class="flex-row border-bottom" style="padding-left:30px;"><p>折扣终价（-{{currentObject.totalMoney-currentObject.finalMoney}}）：</p><p>￥{{currentObject.finalMoney?(currentObject.finalMoney/100):'0'}}</p></div>
        </div>
        <div class="flex-row border-bottom" style="padding-left:30px;">
          <p>备注：{{currentObject.remark?currentObject.remark:'无'}}</p>
        </div>
        <div class="flex-row" style="padding-left:30px;">
          <p>结单（去零）：{{currentObject.payMoney?(currentObject.payMoney/100):'0'}}</p>
        </div>
      </div>
    </div>
    <p>收银员：{{currentObject.adminName}}</p>
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import breadcrumb from '@/components/Breadcrumb'
import { getRecordsDetail } from '@/api/member.js'
export default {
  props:['messageObject'],
  components:{
    breadcrumb
  },
  name:'expenseCalendarDetail',
  data() {
    return {
      currentObject:{},
      dataList:[]
    }
  },
  mounted(){
    this.currentObject = this.messageObject
    this.dataList = this.currentObject.orderDetailList
  },
  watch:{
    'messageObject'(e){
      this.currentObject = e
      this.dataList = this.currentObject.orderDetailList
    }
  },
  methods: {}
}
</script>
<style>
.flex-row{
  display:flex;
  flex-direction:row;
}
.position{
  position: relative;
  right: 10px;
}
.border{
  border:1px solid rgba(187,187,187,1);
}
.border-bottom{
  border-bottom: 1px solid rgba(187,187,187,1);
}
.records-container{
  width:48%;
  padding:1px;
}
.member{
  width:100%;
}
.member-msg{
  width:45%;
  margin:10px;
}
.total{

}
</style>
