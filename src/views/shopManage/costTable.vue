<template>
  <div>
    <table class="table" border='0' cellspacing='0' cellpadding="0">
      <tr class="tr_class" >
        <th class="th_class" rowspan="9">成本({{isNaN(totalCost)?0:totalCost}}万元)</th>
        <th class="th_class" rowspan="4">
          <span>固定成本（元）{{isNaN(fixedCostRate)?0:fixedCostRate*100}}%</span>
        </th>
        <th class="th_class">
          <span>房租（{{isNaN(rentRate)?0:rentRate*100}}%）</span>
        </th>
        <th class="th_class">
          <span v-if="costData.rent">{{costData.rent/100}}</span>
          <span v-else>0.00</span>
        </th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">
          <span>工资支出（{{isNaN(wagesRate)?0:wagesRate*100}}%）</span>
        </th>
        <th class="th_class">
          <span v-if="costData.wages">{{costData.wages/100}}</span>
          <span v-else>0.00</span>
        </th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">
          <span>水电设备（{{isNaN(hydropowerRate)?0:hydropowerRate*100}}%）</span>
        </th>
        <th class="th_class">
          <span v-if="costData.hydropower">{{costData.hydropower/100}}</span>
          <span v-else>0.00</span>
        </th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">
          <span>其它固定费用总计（{{isNaN(otherExpensesRate)?0:otherExpensesRate*100}}%）</span>
        </th>
        <th class="th_class">
          <span v-if="costData.otherExpenses">{{costData.otherExpenses/100}}</span>
          <span v-else>0.00</span>
        </th>
      </tr>

      <tr class="tr_class">
        <th class="th_class" rowspan="5">
          <span>可变成本（元）{{isNaN(changeCostRate)?0:changeCostRate*100}}%</span>
        </th>
        <th class="th_class" >
          <span>营销费用（{{isNaN(marketingRate)?0:marketingRate*100}}%）</span>
        </th>
        <th class="th_class">
          <span v-if="costData.marketing">{{costData.marketing/100}}</span>
          <span v-else>0.00</span>
        </th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">积分抵扣（0%）</th>
        <th class="th_class">
          <span v-if="costData.cost">{{costData.cost/100}}</span>
          <span v-else>0.00</span>
        </th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">
          <span>其它可变费用总计（{{isNaN(otherVariablesRate)?0:otherVariablesRate*100}}%）</span>
        </th>
        <th class="th_class">
          <span v-if="costData.otherVariables">{{costData.otherVariables/100}}</span>
          <span v-else>0.00</span>
        </th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">
          <span>采购成本（{{isNaN(procurementRate)?0:procurementRate*100}}%）</span>
        </th>
        <th class="th_class">
          <span v-if="costData.procurement">{{costData.procurement/100}}</span>
          <span v-else>0.00</span>
        </th>
      </tr>
      <tr class="tr_class">
        <th class="th_class">损耗成本（0%）</th>
        <th class="th_class">
          <span v-if="costData.cost">{{costData.cost/100}}</span>
          <span v-else>0.00</span>
        </th>
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
      // 固定成本
      fixedCostRate:0,
      // 可变成本
      changeCostRate:0,
      // 总成本
      totalCost:0,
    }
  },
  watch:{
    'costObject'(e){
      if(e.profitLossDomain){
        this.costData = e.profitLossDomain
        this.percentFunction(this.costData )
      }else{
        this.costData.rent = 0
        this.costData.wages=0
        this.costData.hydropower=0
        this.costData.otherExpenses=0
        this.costData.marketing=0
        this.costData.otherVariables=0
        this.costData.procurement=0
        this.fixedCostRate = 0
        this.changeCostRate = 0
        this.totalCost  =0
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
        this.totalCost = (total/1000000).toFixed(2)
        // rent 房租占比
        this.rentRate = (param.rent/total).toFixed(2)
        // wages 工资支出占比
        this.wagesRate = (param.wages/total).toFixed(2)
        // hydropower 水电设备占比
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
        this.fixedCostRate = ((param.rent+param.wages+param.hydropower+param.otherExpenses)/total).toFixed(2)
        // 可变成本
        this.changeCostRate = ((param.marketing+param.otherVariables+param.procurement)/total).toFixed(2)
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
