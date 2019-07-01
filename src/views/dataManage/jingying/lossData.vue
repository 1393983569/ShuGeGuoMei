<template>
  <div>
    <el-container>
      <el-aside width="100px" class="aside-background-color">
        损耗数据
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
        // title : {
        //   text: '某站点用户访问来源',
        //   subtext: '纯属虚构',
        //   x:'center'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['收银损耗', '自然损耗', '人工损耗']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            // radius : '55%',
            center: ['50%', '60%'],
            data: [
              { value: 100, name: '收银损耗' },
              { value: 120, name: '自然损耗' },
              { value: 280, name: '人工损耗' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.lossDataHandle()
  },
  methods: {
    lossDataHandle() {
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
