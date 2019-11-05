<template>
  <div>
    <table class="table" border='0' cellspacing='0' cellpadding="0">
      <tr class="tr_class" >
        <th class="th_class" rowspan="9">成本</th>
        <th class="th_class" rowspan="4">固定成本（元）</th>
        <th class="th_class">房租（{{rentRate*100}}%）</th>
        <th class="th_class"><span v-if="costData">{{costData.rent/100}}</span></th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">工资支出（{{wagesRate*100}}%）</th>
        <th class="th_class"><span v-if="costData">{{costData.wages/100}}</span></th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">水电设备（{{hydropowerRate*100}}%）</th>
        <th class="th_class"><span v-if="costData"></span>{{costData.hydropower/100}}</th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">其它固定费用总计（{{otherExpensesRate*100}}%）</th>
        <th class="th_class"><span v-if="costData">{{costData.otherExpenses/100}}</span></th>
      </tr>

      <tr class="tr_class">
        <th class="th_class" rowspan="5">可变成本（元）</th>
        <th class="th_class" >营销费用（{{marketingRate*100}}%）</th>
        <th class="th_class"><span v-if="costData">{{costData.marketing/100}}</span></th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">积分抵扣</th>
        <th class="th_class"></th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">其它可变费用总计（{{otherVariablesRate*100}}%）</th>
        <th class="th_class"><span v-if="costData">{{costData.otherVariables/100}}</span></th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">采购成本（{{procurementRate*100}}%）</th>
        <th class="th_class"><span v-if="costData">{{costData.procurement/100}}</span></th>
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
      if(e.profitLossDomain){
        console.log(e, 'cost1........')
        this.costData = e.profitLossDomain
        this.percentFunction(this.costData )
      }else{
        console.log(e, 'cost0........')
        this.costData.rent = 0
        this.costData.wages=0
        this.costData.hydropower=0
        this.costData.otherExpenses=0
        this.costData.marketing=0
        this.costData.otherVariables=0
        this.costData.procurement=0
      }

    }
  },
  mounted(){},
  methods:{
    // 百分比计算方法
    percentFunction(param){
      if(param){
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
        // 固定成本占比
        // this.fixedCostRate = this.rentRate+this.wagesRate+this.hydropowerRate+
      }else{

      }


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
