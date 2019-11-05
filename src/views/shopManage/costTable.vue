<template>
  <div>
    <table class="table" border='0' cellspacing='0' cellpadding="0">
      <tr class="tr_class" >
        <th class="th_class" rowspan="9">成本</th>
        <th class="th_class" rowspan="4">固定成本（元）</th>
        <th class="th_class">房租{{rentRate*100}}%</th>
        <th class="th_class">{{costData.rent/100}}</th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">工资支出{{wagesRate*100}}</th>
        <th class="th_class">{{costData.wages/100}}</th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">水电设备{{hydropowerRate*100}}</th>
        <th class="th_class">{{costData.hydropower/100}}</th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">其它固定费用总计{{otherExpensesRate*100}}</th>
        <th class="th_class">{{costData.otherExpenses/100}}</th>
      </tr>

      <tr class="tr_class">
        <th class="th_class" rowspan="5">可变成本（元）</th>
        <th class="th_class" >营销费用{{marketingRate*100}}</th>
        <th class="th_class">{{costData.marketing/100}}</th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">积分抵扣</th>
        <th class="th_class"></th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">其它可变费用总计{{otherVariablesRate}}</th>
        <th class="th_class">{{costData.otherVariables/100}}</th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">采购成本{{procurementRate}}</th>
        <th class="th_class">{{costData.procurement/100}}</th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">损耗成本</th>
        <th class="th_class"></th>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name:'costTable',
  props:['costObject'],
  data(){
    return {
      costData:{},
      rentRate:'',
      wagesRate:'',
      hydropowerRate:'',
      otherExpensesRate:'',
      marketingRate:'',
      otherVariablesRate:'',
      procurementRate:'',
    }
  },
  watch:{
    'costObject'(e){
      this.costData = e.profitLossDomain
      console.log(e, 'eeeeeee')
      this.percentFunction(this.costData )
    }
  },
  mounted(){},
  methods:{
    // 百分比计算方法
    percentFunction(param){
      // 总成本
      let total = param.hydropower+param.marketing+param.otherExpenses+param.otherVariables+param.procurement+param.rent+param.wages
      // rent 房租占比
      this.rentRate = (param.rent/total).toFixed(2)
      // wages 工资支出占比
      this.wagesRate = (param.wages/total).toFixed(2)
      // hydropower 水电暖合计占比
      this.hydropowerRate = (param.hydropower/total).toFixed(2)
      // otherExpenses 其他固定费用总计占比
      this.otherExpensesRate = (param.otherExpenses/total).toFixed(2)
      // marketing 营销费用占比
      this.marketingRate = (param.marketing/total).toFixed(2)
      // otherVariables 其他可变费用总计占比
      this.otherVariablesRate = (param.otherVariables/total).toFixed(2)
      // procurement 采购成本占比
      this.procurementRate = (param.procurement/total).toFixed(2)

    }

  },
}
</script>
<style>
.table{
  color:#606266;
  font-weight:normal !important;
  border:0.5px solid rgba(187, 187, 187, 1);
}
.tr_class{
  width:200px;
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
</style>
