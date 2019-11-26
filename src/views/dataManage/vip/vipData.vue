<template>
  <div>
    <div style="width:100%;height:100%;">
      <div class="header">
        <div class="header-item">会员总数（人）: {{membersCount}}</div>
        <div class="header-item">新增会员（人）: 700</div>
      </div>
      <div class="header">
        <div class="body">
          <div class="body-header">性别构成</div>
          <div>
            <div ref="chart1" class="chartStyleVip" />
          </div>
        </div>
        <div class="body" style="margin-right:9px;margin-left:9px;">
          <div class="body-header">身份构成</div>
          <div>
            <div ref="chart2" class="chartStyleVip" />
          </div>
        </div>
        <div class="body">
          <div class="body-header">级别构成</div>
          <div>
            <div ref="chart3" class="chartStyleVip" />
          </div>
        </div>
      </div>
      <!-- <profession /> -->
    </div>
    <!-- <el-container>
      <el-aside width="100px">
        折扣力度
      </el-aside>
      <el-main>
        sssss
      </el-main>
    </el-container> -->
  </div>
</template>
<script>
import {getVip} from '@/api/dataManage/dataCenter'
import profession from './profession.vue'
export default {
  props:['vipObject'],
  components: { profession },
  data() {
    return {
      currentVip:{},
      membersCount:0,
      optionSex: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['男', '女']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '男' },
              { value: 310, name: '女' }
            ]
          }
        ]
      },
      optionRank: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['普通会员', '银牌会员', '金牌会员', '钻石会员']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 300, name: '普通会员' },
              { value: 500, name: '银牌会员' },
              { value: 100, name: '金牌会员' },
              { value: 100, name: '钻石会员' }
            ]
          }
        ]
      },
      optionIdentity: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['VIP会员', '家庭会员']
        },
        series: [
          {
            name: '会员分析',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      }
    }
  },
  mounted() {
    this.currentVip = this.vipObject
    this.handleSex()
    this.handleIdentity()
    this.handleRank()
  },
  watch:{
    'vipObject'(e){
      this.currentVip = e
    }
  },
  methods: {
    handleSex() {
      var myChart = this.$echarts.init(this.$refs.chart1)
      myChart.setOption(this.optionSex)
    },
    handleIdentity() {
      var myChart = this.$echarts.init(this.$refs.chart2)
      myChart.setOption(this.optionIdentity)
      let op = this.optionIdentity
      getVip(this.currentVip.year,this.currentVip.month,this.currentVip.day,this.currentVip.shopId).then(res => {
        let arr = []
        let obj1= {}
        obj1.name ='家庭会员'
        obj1.value = res.info.family
        arr.push(obj1)
        let obj2= {}
        obj2.name ='VIP会员'
        obj2.value = res.info.members
        arr.push(obj2)
        op.series[0].data = arr
        myChart.setOption(op)
        this.membersCount = res.info.memberCount
      }).catch(err => {
        console.log(err)
      })
    },
    handleRank() {
      var myChart = this.$echarts.init(this.$refs.chart3)
      myChart.setOption(this.optionRank)
    }
  }
}
</script>
<style>
.header{
  display: flex;
  flex-direction: row;
  width:100%;
}
.header-item{
  width:48.2%;
  margin: 5px;
  height: 80px;
  background-color:#ffffff;
  border-radius: 5px;
  text-align: center;
  line-height: 80px;
}
.body{
  width:31.5%;
  /* margin-right: 13px; */
  /* margin-top: 5px; */
  margin:5px;
  height: 296px;
  background-color: #ffffff;
  border-radius: 5px;
  text-align: center;
  line-height: 80px;
}
.body-header{
  width: 100%;
  height: 50px;
  border-bottom: rgb(231, 227, 227) 1px solid;
  /* border-bottom: rgba(227, 229, 231, 0.493) 1px solid; */
  text-align: center;
  line-height: 50px;
}
.chartStyleVip {
  height: 240px;
  width:100%;
  box-sizing: border-box;
  line-height: 230px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  /* margin: 5px; */
  /* background-color:  #FFFFFF; */
}
</style>
