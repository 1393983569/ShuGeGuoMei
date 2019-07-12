<template>
  <div>
    <el-container>
      <el-aside width="100px">职业构成</el-aside>
      <el-main>
        <div ref="chart" class="chartStyle" />
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      option : {
        backgroundColor: '#FFFFFF',
          title: {
              text: '职业构成',
              // subtext: '纯属虚构'
          },
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}%"
          },
          toolbox: {
              feature: {
                  dataView: {readOnly: false},
                  restore: {},
                  saveAsImage: {}
              }
          },
          legend: {
              data: ['职业1','职业2','职业3','职业4','职业5','职业6','职业7','职业8']
          },
          calculable: true,
          series: [
              {
                  // name:'漏斗图',
                  type:'funnel',
                  left: '10%',
                  top: 60,
                  bottom: 40,
                  width: '80%',
                  min: 0,
                  max: 100,
                  minSize: '0%',
                  maxSize: '100%',
                  sort: 'descending',
                  gap: 2,
                  label: {
                      show: true,
                      position: 'inside'
                  },
                  labelLine: {
                      length: 10,
                      lineStyle: {
                          width: 1,
                          type: 'solid'
                      }
                  },
                  itemStyle: {
                      // borderColor: '#fff',
                      borderWidth: 1
                  },
                  emphasis: {
                      label: {
                          fontSize: 20
                      }
                  },
                  data: [
                      {value: 10, name: '职业1'},
                      {value: 20, name: '职业2'},
                      {value: 30, name: '职业3'},
                      {value: 40, name: '职业4'},
                      {value: 50, name: '职业5'},
                      {value: 60, name: '职业6'},
                      {value: 70, name: '职业7'},
                      {value: 80, name: '职业8'}
                  ]
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
      var myChart = this.$echarts.init(this.$refs.chart)
      myChart.setOption(this.option)
    }
  }
}
</script>
<style>
.aside{
  width: 100px;
  height: 400px;
  background-color: #CCCCCC;
}
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
