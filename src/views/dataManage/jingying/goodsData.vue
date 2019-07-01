<template>
  <div>
    <el-container>
      <el-aside width="100px" class="aside-background-color">
        商品数据
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['库存', '销量']
        },
        xAxis: [
          {
            type: 'category',
            data: ['白菜', '青菜', '萝卜', '油麦菜', '韭菜', '菠菜', '空心菜', '生菜', '香菜'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '库存',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} (斤)'
            }
          },
          {
            type: 'value',
            name: '销量',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} (斤)'
            }
          }
        ],
        series: [
          {
            name: '库存',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7]
          },
          {
            name: '销量',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0]
          }
        ]
      }
    }
  },
  mounted() {
    this.goodsChartHandle()
  },
  methods: {
    goodsChartHandle() {
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
