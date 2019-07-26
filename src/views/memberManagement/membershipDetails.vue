<template>
  <div>
    <p>会员ID：</p>
    <p>手机号：</p>
    <p>注册时间：</p>
    <div>
      <div style="display: inline-block; vertical-align: top">头像： </div>
      <el-image
        style="width: 50px; height: 50px; display: inline-block"
        :fit="fit"
        :src="img"
      />
    </div>
    <div class="div_margin">
      <span>余额：</span><el-button type="success">查询详情</el-button>
    </div>
    <div class="div_margin">
      <span>积分：</span><el-button type="success" @click="integralDetails">查询详情</el-button>
    </div>
    <p>性别：</p>
    <p>年龄：</p>
    <p>职业：</p>
    <p>常住小区：</p>
    <p>身份：</p>
    <p>折扣能力：</p>
    <p>级别：</p>
    <div>
      <div style="display: inline-block; vertical-align: top;">
        会员分析：
      </div>
      <div style="display: inline-block; width: 520px; height: 540px; background-color: #f3f2f2">
        <p>平均购买能力：</p>
        <p>最高订单额：</p>
        <p>最低订单额：</p>
        <div>
          <el-row>
            <el-col :span="5">
              <div>复购品类：</div>
            </el-col>
            <el-col :span="19">
              <div style="height: 315px;">
                <div ref="chart" class="chartStyle" />
              </div>
            </el-col>
          </el-row>
        </div>
        <p>每周进店次数：</p>
        <p>每月进店次数：</p>
      </div>
    </div>
   <div class="div_margin">消费记录<el-button type="success" @click="sellRecords">消费记录</el-button></div>
   <div class="div_margin">充值记录：<el-button type="success" @click="rechargeRecords">充值记录</el-button></div>
  </div>
</template>

<script>
export default {
  name: 'MembershipDetails',
  data() {
    return {
      row: {},
      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      fit: 'fit',
      option:{
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              x : 'center',
              y : 'bottom',
              data:['一级品类1','一级品类2','一级品类3','一级品类4','二级品类1','二级品类2','二级品类3','二级品类4']
          },
          toolbox: {
              show : true,
              feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {
                      show: true,
                      type: ['pie', 'funnel']
                  },
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          calculable : true,
          series : [
              {
                  name:'半径模式',
                  type:'pie',
                  radius : [14, 60],
                  center : ['50%', '30%'],
                  roseType : 'radius',
                  label: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  lableLine: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: false
                      }
                  },
                  data:[
                      {value:10, name:'一级品类1'},
                      {value:5, name:'一级品类2'},
                      {value:15, name:'一级品类3'},
                      {value:25, name:'一级品类4'},
                      {value:20, name:'二级品类1'},
                      {value:35, name:'二级品类2'},
                      {value:30, name:'二级品类3'},
                      {value:40, name:'二级品类4'}
                  ]
              }
          ]
      }
    }
  },
  beforeRouteEnter(to, form, next) {
    next(mv => {
      mv.row = to.params.row
      console.log(mv.row, 'ssssssssssssssssssss')
    })
  },
  mounted() {
    this.showRow()
    this.goodsChartHandle()
  },
  methods: {
    showRow() {
      console.log(this.row)
    },
    integralDetails() {
      this.$router.push({name: 'integralDetails'})
    },
    sellRecords() {
      this.$router.push({name:'expenseCalendar'})
    },
    rechargeRecords(){
      this.$router.push({name:'rechargeRecord'})
    },
    goodsChartHandle() {
      var myChart = this.$echarts.init(this.$refs.chart)
      myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped>
.div_margin{
  margin:5px;
}
.chartStyle {
  height: 300px;
  width:80%;
  box-sizing: border-box;
  line-height: 300px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  /* margin: 5px; */
  background-color: #FFFF;
}
</style>
