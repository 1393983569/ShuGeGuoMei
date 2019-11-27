<template>
  <div>
    <el-container>
      <el-aside width="100px">
        收入趋势
      </el-aside>
      <el-main>
        <div ref="chart1" class="chartStyleIncome" />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {getIncomeTrend} from '@/api/dataManage/dataCenter'
export default {
  props:['incomeTrend'],
  data() {
    return {
      currentIncome:{},
      option: {
        backgroundColor: '#FFFFFF',
        tooltip: {},
        title: [{
          // text: '在线构建',
          subtext: '单位: 元',
          x: '80%',
          textAlign: 'center'
        }],
        grid: [{
          top: 50,
          width: '90%',
          bottom: '10%',
          left: 10,
          containLabel: true
        }],
        xAxis: [{
          type: 'value',
          // max: 160000,
          splitLine: {
            show: false
          }
        }],
        yAxis: [{
          type: 'category',
          data: [
            { value: '12月' },
            { value: '11月' },
            { value: '10月' },
            { value: '9月' },
            { value: '8月' },
            { value: '7月' },
            { value: '6月' },
            { value: '5月' },
            { value: '4月' },
            { value: '3月' },
            { value: '2月' },
            { value: '1月' }
          ],
          axisLabel: {
            interval: 0,
            rotate: 0
          },
          splitLine: {
            show: false
          }
        }],
        series: [{
          type: 'bar',
          stack: 'chart',
          z: 3,
          label: {
            normal: {
              position: 'right',
              show: true
            }
          },
          data: []
        },
        {
          type: 'bar',
          stack: 'chart',
          silent: true,
          itemStyle: {
            normal: {
              color: '#8BC34A',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    }
  },
  mounted() {
    this.currentIncome = this.incomeTrend
    this.chartHandle()
  },
  watch:{
    'incomeTrend'(e){
      this.currentIncome = e
      this.chartHandle()
    }
  },
  methods: {
    chartHandle() {
      var myChart = this.$echarts.init(this.$refs.chart1)
      myChart.setOption(this.option)
      let op = this.option
      getIncomeTrend(this.currentIncome.year, this.currentIncome.shopId).then(res => {
        let arr = []
        arr.push(res.info.december/100)
        arr.push(res.info.november/100)
        arr.push(res.info.october/100)
        arr.push(res.info.september/100)
        arr.push(res.info.august/100)
        arr.push(res.info.july/100)
        arr.push(res.info.june/100)
        arr.push(res.info.may/100)
        arr.push(res.info.april/100)
        arr.push(res.info.march/100)
        arr.push(res.info.february/100)
        arr.push(res.info.january/100)
        op.series[0].data = arr
        myChart.setOption(op)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
.chartStyleIncome {
  height: 400px;
  width:100%;
  height: 100%;
  box-sizing: border-box;
  line-height: 400px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  /* margin: 5px; */
  /* background-color:rgb(221, 12, 12);ss */
}
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 400px;
    margin:0px;
    padding:0px;
  }
</style>
