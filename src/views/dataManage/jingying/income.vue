<template>
  <div>
    收入构成
  </div>
</template>
<script>
import {getIncome} from '@/api/dataManage/dataCenter'
export default {
  props:['incomObject'],
  data(){
    return{
      currentIncomeObj:{},
      dataArr:[],
    }
  },
  mounted(){
    this.currentIncomeObj = this.incomObject
    // this.getIncomeFunction()
  },
  watch:{
    'incomObject'(e){
      this.currentIncomeObj = e
    }
  },
  methods:{
    chartHandle() {
      var myChart = this.$echarts.init(this.$refs.chart1)
      myChart.setOption(this.option)
      let op = this.option
      getIncome(this.currentIncomeObj.year,this.currentIncomeObj.month,this.currentIncomeObj.day,this.currentIncomeObj.shopId).then(res=> {
        if(res.status === 1){
          let obj1 = {}
          obj1.name = '手机'
          obj1.value = res.info.four
          this.dataArr.push(obj1)
          let obj2 = {}
          obj2.name = '其它'
          obj2.value = res.info.one
          this.dataArr.push(obj2)
          let obj3 = {}
          obj3.name = '金额'
          obj3.value = res.info.two
          this.dataArr.push(obj3)
          let obj4 = {}
          obj4.name = '现金'
          obj4.value = res.info.three
          this.dataArr.push(obj4)
          op.series[0].data = this.dataArr
          myChart.setOption(op)
        }
      }).catch(err => {
        myChart.setOption(op)
      })
    }
  }
}
</script>
<style>
.el-asides {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    margin:0px;
    padding:0px;
    width:116px;
  }
  .incomeBody{
    width:100%;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
  }
  .phoneBody{
    display: flex;
    flex-direction: row;
  }
</style>
