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
import {getLossData} from '@/api/dataManage/dataCenter'
export default {
  props:['lossObject'],
  data() {
    return {
      option: {
        currentObj: {},
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
            data: [],
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
    this.currentObj = this.lossObject
    this.lossDataHandle()
  },
  watch:{
    'lossObject'(e){
      this.currentObj = e
    }
  },
  methods: {
    lossDataHandle() {
      var myChart = this.$echarts.init(this.$refs.chart1)
      myChart.setOption(this.option)
      let op = this.option
      getLossData(this.currentObj.year,this.currentObj.month,this.currentObj.day,this.currentObj.shopId).then(res => {
        let arr = []
        let obj1 = {}
        obj1.name = '收银损耗',
        obj1.value = res.info.lossMoney
        arr.push(obj1)
        let obj2 = {}
        obj2.name = '自然损耗',
        obj2.value = res.info.natural
        arr.push(obj2)
        let obj3 = {}
        obj3.name = '人工损耗',
        obj3.value = res.info.artificial
        arr.push(obj3)
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
