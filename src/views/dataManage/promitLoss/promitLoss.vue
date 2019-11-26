<template>
  <div>
    <el-container>
      <el-aside width="100px" class="aside-background-color">
        年度盈亏曲线
      </el-aside>
      <el-main>
        <div ref="chart1" class="chartStyle" />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {getIncomeLoss} from '@/api/dataManage/dataCenter'
export default {
  props:['incomLoss'],
  data() {
    return {
      currentData:{},

      option : {
        backgroundColor:"#FFFFFF",
        tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
        },
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
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
                name:'收入',
                type:'line',
                smooth: false,
                data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
            },
            {
                name:'利润',
                type:'line',
                smooth: false,
                data: [3.0, 5.0, 11.0, 18.0, 4.0, 6.0, 231.6, 46.0, 55.0, 18.4, 10.3, 9]
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
    }
  },
  methods: {
    chartHandle() {
      var myChart = this.$echarts.init(this.$refs.chart1)
      myChart.setOption(this.option)
      // getIncomeLoss(this.currentData.year,this.currentData.shopId).then(res => {
      //   let arrIncome = []

      // }).catch(err => {
      //   console.log(err)
      // })
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
