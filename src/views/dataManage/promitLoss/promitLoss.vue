<template>
  <div >
    <el-container>
      <el-aside width="100px" class="aside-background-color">
        年度盈亏曲线
      </el-aside>
      <el-main>
        <div style="width:80px;text-align:center;">
          <el-button size="mini" style="margin:5px;" type="primary" @click="searchFunction('')">全部</el-button>
          <el-button size="mini" style="margin:5px;" type="warning" @click="searchFunction(1)">直营</el-button>
          <el-button size="mini"  style="margin:5px;" type="success" @click="searchFunction(2)">加盟</el-button>
        </div>
        <div ref="chart1" class="chartStyle" />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {getIncomeLoss} from '@/api/dataManage/dataCenter'
import { type } from 'os';
export default {
  props:['incomLoss'],
  data() {
    return {
      currentData:{},
      type:'',
      option : {
        backgroundColor:"#FFFFFF",
        tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
        },
        title: [{
          // text: '在线构建',
          subtext: '单位: 元',
          x: '80%',
          textAlign: 'center'
        }],
        legend: {
              data: ['利润', '成本','收入']
            },
        grid: {
            top: 70,
            bottom: 50
        },
        xAxis: [
            {
                type: 'category',
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: 'black'
                    }
                },
                data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
            },
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        // color: 'red'
                    }
                },
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name:'成本',
                type:'line',
                xAxisIndex: 1,
                smooth: false,
                data: []
            },
            {
                name:'收入',
                type:'line',
                smooth: false,
                data: []
            },
            {
                name:'利润',
                type:'line',
                smooth: false,
                data: []
            }
        ]
    }
    }
  },
  mounted() {
    this.currentData = this.incomLoss
    this.chartHandle()
  },
  watch:{
    'incomLoss'(e){
      this.currentData = e
      this.chartHandle()
    }
  },
  methods: {
    searchFunction(type){
      this.type = type

      this.chartHandle()
    },
    chartHandle() {
      var myChart = this.$echarts.init(this.$refs.chart1)
      myChart.setOption(this.option)
      let op = this.option
      console.log(this.type, 'kkkkk')
      getIncomeLoss(this.currentData.year,this.currentData.shopId, this.type).then(res => {
        let arrIncome = []
        let arrLoss = []
        let arrProfit = []
        if(res.status === 1){
          let loss=res.msg
          let income=res.info
          let profit = {}
          // 收入
          arrIncome.push(income.januaryIncome?income.januaryIncome/100:0)
          arrIncome.push(income.februaryIncome?income.februaryIncome/100:0)
          arrIncome.push(income.marchIncome?income.marchIncome/100:0)
          arrIncome.push(income.aprilIncome?income.aprilIncome/100:0)
          arrIncome.push(income.mayIncome?income.mayIncome/100:0)
          arrIncome.push(income.juneIncome?income.juneIncome/100:0)
          arrIncome.push(income.julyIncome?income.julyIncome/100:0)
          arrIncome.push(income.augustIncome?income.augustIncome/100:0)
          arrIncome.push(income.septemberIncome?income.septemberIncome/100:0)
          arrIncome.push(income.octoberIncome?income.octoberIncome/100:0)
          arrIncome.push(income.novemberIncome?income.novemberIncome/100:0)
          arrIncome.push(income.decemberIncome?income.decemberIncome/100:0)
          // 成本
          arrLoss.push(loss.januaryCost?loss.januaryCost/100:0)
          arrLoss.push(loss.februaryCost?loss.februaryCost/100:0)
          arrLoss.push(loss.marchCost?loss.marchCost/100:0)
          arrLoss.push(loss.aprilCost?loss.aprilCost/100:0)
          arrLoss.push(loss.mayCost?loss.mayCost/100:0)
          arrLoss.push(loss.juneCost?loss.juneCost/100:0)
          arrLoss.push(loss.julyCost?loss.julyCost/100:0)
          arrLoss.push(loss.augustCost?loss.augustCost/100:0)
          arrLoss.push(loss.septemberCost?loss.septemberCost/100:0)
          arrLoss.push(loss.octoberCost?loss.octoberCost/100:0)
          arrLoss.push(loss.novemberCost?loss.novemberCost/100:0)
          arrLoss.push(loss.decemberCost?loss.decemberCost/100:0)
          // 利润
          profit.one = (income.januaryIncome-loss.januaryCost)/100
          profit.two = (income.februaryIncome-loss.februaryCost)/100
          profit.three = (income.marchIncome-loss.marchCost)/100
          profit.four = (income.aprilIncome-loss.aprilCost)/100
          profit.five = (income.mayIncome-loss.mayCost)/100
          profit.six = (income.januaryIncome-loss.juneCost)/100
          profit.seven = (income.juneIncome-loss.julyCost)/100
          profit.eight = (income.augustIncome-loss.augustCost)/100
          profit.nine = (income.septemberIncome-loss.septemberCost)/100
          profit.ten = (income.octoberIncome-loss.octoberCost)/100
          profit.eleven = (income.novemberIncome-loss.novemberCost)/100
          profit.twelve = (income.decemberIncome-loss.decemberCost)/100
          arrProfit.push(profit.one)
          arrProfit.push(profit.two)
          arrProfit.push(profit.three)
          arrProfit.push(profit.four)
          arrProfit.push(profit.five)
          arrProfit.push(profit.six)
          arrProfit.push(profit.seven)
          arrProfit.push(profit.eight)
          arrProfit.push(profit.nine)
          arrProfit.push(profit.ten)
          arrProfit.push(profit.eleven)
          arrProfit.push(profit.twelve)

          op.series[0].data = arrLoss
          op.series[1].data = arrIncome
          op.series[2].data = arrProfit
          myChart.setOption(op)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
.chartStyle {
  height: 400px;
  width:100%;
  box-sizing: border-box;
  line-height: 400px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  margin: 5px;
  background-color: aliceblue;
}
</style>
