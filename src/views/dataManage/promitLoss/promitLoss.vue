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
export default {
  data() {
    return {
      option: {
        backgroundColor: '#FFFFFF',
        // title: {
        //   text: '折线图堆叠'
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['收入', '利润', '成本']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '收入',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 200]
          },
          {
            name: '利润',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310, 101, 134, 90, 230, 100]
          },
          {
            name: '成本',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410, 101, 134, 90, 230, 210]
          }
        ]
      }
    }
  },
  mounted() {
    this.chartHandle()
  },
  methods: {
    chartHandle() {
      var myChart = this.$echarts.init(this.$refs.chart1)
      myChart.setOption(this.option)
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
