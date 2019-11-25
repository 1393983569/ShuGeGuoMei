<template>
  <div>
    <el-container>
      <el-aside width="100px" class="aside-background-color">
        经营数据
      </el-aside>
      <el-main>
        <table class="table" border='0' cellspacing='0' cellpadding="0">
          <tr class="tr_class" >
            <th class="th_class" rowspan="2" colspan="2">销售额（{{}}万元）</th>
            <th class="th_class">收银损耗（元）</th>
            <th class="th_class">{{this.jingyingData.loss?this.jingyingData.loss/100:0}}</th>
          </tr>
          <tr class="tr_class" >
            <th class="th_class">实收金额（元）</th>
            <th class="th_class">{{this.jingyingData.payMoneyCount?this.jingyingData.payMoneyCount/100:0}}</th>
          </tr>
          <tr class="tr_class">
            <th class="th_class" colspan="3">实收（元）</th>
            <th class="th_class">{{this.jingyingData.payMoneyCount?this.jingyingData.payMoneyCount/100:0}}</th>
          </tr>
          <tr class="tr_class" >
            <th class="th_class" colspan="3">销售笔数（单）</th>
            <th class="th_class">{{this.jingyingData.consumeOrder?this.jingyingData.consumeOrder:0}}</th>
          </tr>
          <tr class="tr_class" >
            <th class="th_class" colspan="3">人均消费</th>
            <th class="th_class">{{this.jingyingData.avgOrderMoney?this.jingyingData.avgOrderMoney:0}}</th>
          </tr>
          <tr class="tr_class">
            <th class="th_class" rowspan="9">
              <span v-if="this.currentTotal>10000">成本（{{this.currentTotal?this.currentTotal/1000000:0}}元）</span>
              <span v-else>成本（{{this.currentTotal?this.currentTotal/100:0}}元）</span>
            </th>
            <th class="th_class" rowspan="4">固定成本（元）{{this.fixPercent}}%</th>
            <th class="th_class">房租（{{this.rentPercent}}%）</th>
            <th class="th_class">{{this.jingyingData.rent?this.jingyingData.rent/100:0}}</th>
          </tr>
          <tr class="tr_class" >
            <th class="th_class">工资支出（{{this.wagesPercent}}}%）</th>
            <th class="th_class">{{this.jingyingData.wages?this.jingyingData.wages/100:0}}</th>
          </tr>
          <tr class="tr_class" >
            <th class="th_class">水电暖合计（{{this.hydropowerPercent}}}%）</th>
            <th class="th_class">{{this.jingyingData.hydropower?this.jingyingData.hydropower/100:0}}</th>
          </tr>
          <tr class="tr_class" >
            <th class="th_class">其他固定费用总计（{{this.otherExpensesPercent}}%）</th>
            <th class="th_class">{{this.jingyingData.otherExpenses?this.jingyingData.otherExpenses/100:0}}</th>
          </tr>
          <tr class="tr_class" >
            <th class="th_class" rowspan="5">可变成本（元）{{this.changePercent}}%</th>
            <th class="th_class">营销费用（0%）</th>
            <th class="th_class">{{this.jingyingData.marketing?this.jingyingData.marketing/100:0}}</th>
          </tr>
          <tr class="tr_class" >
            <th class="th_class">积分抵扣（0%）</th>
            <th class="th_class">0</th>
          </tr>
          <tr class="tr_class" >
            <th class="th_class">其它可变费用总计（{{this.otherVariablesPercent}}%）</th>
            <th class="th_class">{{this.jingyingData.otherVariables?this.jingyingData.otherVariables/100:0}}</th>
          </tr>
          <tr class="tr_class" >
            <th class="th_class">采购成本({{this.totalMoneyPercent}}%)</th>
            <th class="th_class">{{this.jingyingData.totalMoney?this.jingyingData.totalMoney/100:0}}</th>
          </tr>
          <tr class="tr_class" >
            <th class="th_class">损耗成本（{{this.lossMoneyPercent}}%）</th>
            <th class="th_class">{{this.jingyingData.lossMoney?this.jingyingData.lossMoney/100:0}}</th>
          </tr>
          <tr class="tr_class" >
            <th class="th_class" colspan="3">利润（元）</th>
            <th class="th_class"></th>
          </tr>
        </table>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {getJintYing} from '@/api/dataManage/dataCenter'
export default {
  props:['jyObject'],
  data() {
    return {
      jingyingData:{
        loss: 0,
        wages: 0,
        marketing: 0,
        lossMoney: 0,
        otherExpenses: 0,
        consumeOrder: 0,
        payMoneyCount: 0,
        hydropower: 0,
        totalMoney: 0,
        totalMoneyCount: 0,
        rent: 0,
        otherVariables: 0
      },
      // 百分比
      fixPercent:0,
      changePercent:0,
      rentPercent:0,
      wagesPercent:0,
      hydropowerPercent:0,
      otherExpensesPercent:0,
      marketingPercent:0,
      otherVariablesPercent:0,
      totalMoneyPercent:0,
      lossMoneyPercent:0,

      currentTotal:0,
      currentData:{},
    }
  },
  mounted(){
    this.currentData = this.jyObject
    this.getJYFunction()
  },
  watch:{
    'jyObject'(e){
      this.currentData = e
      this.getJYFunction()
    }
  },
  methods: {
    getJYFunction(){
      console.log(this.currentData.shopId, 'data.....jingying')
      getJintYing(this.currentData.year, this.currentData.month, this.currentData.day, this.currentData.shopId).then(res => {
        if(res.status === 1){
          this.jingyingData = res.info
          let fixation = this.jingyingData.rent+this.jingyingData.wages+this.jingyingData.hydropower+this.jingyingData.otherExpenses
          let change = this.jingyingData.marketing+this.jingyingData.otherVariables+this.jingyingData.totalMoney+this.jingyingData.lossMoney
          this.currentTotal =(fixation+change)
          this.fixPercent = ((fixation/this.currentTotal)*100).toFixed(2)
          this.changePercent = ((change/this.currentTotal)*100).toFixed(2)

          this.rentPercent = ((this.jingyingData.rent/this.currentTotal)*100).toFixed(2)
          this.wagesPercent = ((this.jingyingData.wages/this.currentTotal)*100).toFixed(2)
          this.hydropowerPercent = ((this.jingyingData.hydropower/this.currentTotal)*100).toFixed(2)
          this.otherExpensesPercent = ((this.jingyingData.otherExpenses/this.currentTotal)*100).toFixed(2)
          this.marketingPercent = ((this.jingyingData.marketing/this.currentTotal)*100).toFixed(2)
          this.otherVariablesPercent = ((this.jingyingData.otherVariables/this.currentTotal)*100).toFixed(2)
          this.totalMoneyPercent = ((this.jingyingData.totalMoney/this.currentTotal)*100).toFixed(2)
          this.lossMoneyPercent = ((this.jingyingData.lossMoney/this.currentTotal)*100).toFixed(2)

          // 利润
          // this.profit =
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
.table{
  width:100%;
  color:#606266;
  font-weight:normal !important;
  border:0.5px solid rgba(187, 187, 187, 1);
}
.tr_class{
  width:100%;
  height:50px;
}
.th_class{
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: center;
  font-family: SourceHanSansSC-regular;

  font-weight:normal !important;
  border-left:1px solid rgba(187, 187, 187, 1);
  border-bottom:1px solid rgba(187, 187, 187, 1);
  width:200px;
  padding:0px;
  margin:0px;
}
.aside-background-color{
  line-height: 700px;
}
</style>
