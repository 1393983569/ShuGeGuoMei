<template>
  <div>
    <Breadcrumb :stateShow="stateShowBread"></Breadcrumb>
    <p>会员ID：{{vipObject.id}}</p>
    <p>手机号：{{vipObject.mobile}}</p>
    <p>注册时间：{{vipObject.registerTime}}</p>
    <div>
      <div style="display: inline-block; vertical-align: top">头像： </div>
      <el-image
        style="width: 50px; height: 50px; display: inline-block"
        :fit="fit"
        :src="vipObject.avatar"
      />
    </div>
    <div class="div_margin">
      <span>余额：{{vipObject.balance/100}} </span><el-button type="success">查询详情</el-button>
    </div>
    <div class="div_margin">
      <span>积分：
        <span v-if="vipObject.score">{{vipObject.score}}</span>
        <span v-else>0</span>
      </span>
      <el-button type="success" @click="integralDetails">查询详情</el-button>
    </div>
    <p>性别：----
      <!-- <span v-if="vipObject.sex">{{vipObject.sex}}</span>
      <span v-else>----</span> -->
    </p>
    <p>年龄：
      <span v-if="vipObject.age">{{vipObject.age}}</span>
      <span v-else>----</span>
    </p>
    <p>职业：
      <span v-if="vipObject.career">{{vipObject.career}}</span>
      <span v-else>----</span>
    </p>
    <p>常住小区：
      <span v-if="province||city||area">{{province}},{{city}},{{area}}</span>
      <span v-else>----</span>
    </p>
    <p>身份：
      <span v-if="vipObject.identity===1">家庭会员</span>
      <span v-else>VIP会员</span>
    </p>
    <p>折扣能力：
      <span v-if="vipObject.discountAbility">{{vipObject.discountAbility}}</span>
      <span v-else>100</span>
    </p>
    <p>级别：
      <span v-if="vipObject.level===1">普通会员</span>
      <span v-else-if="vipObject.level===2">银牌会员</span>
      <span v-else-if="vipObject.level===3">金牌会员</span>
      <span v-else>钻石会员</span>
    </p>
    <div>
      <span>
        会员分析：
      </span>
      <div style="width:1000px; height: 800px; background-color: #f3f2f2;padding:10px;">
        <p>平均购买能力：{{vipObject.avgPayMoney}}</p>
        <p>最高订单额：{{vipObject.maxPayMoney}}</p>
        <p>最低订单额：{{vipObject.minPayMoney}}</p>
        <p>每周进店次数：{{vipObject.weekAmount}}</p>
        <p>每月进店次数：{{vipObject.monthAmount}}</p>
        <div>
          <el-row>
            <el-col :span="5">
              <div>复购品类：</div>
            </el-col>
            <el-col :span="19">
              <div style="height: 400px;" class="echart">
                <span style="color:red;font-size:8px;" v-if="titleState">双击图形查看二级品类复购</span>
                <div ref="chart" class="chartStyle" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
   <div class="div_margin">消费记录<el-button type="success" @click="sellRecords">消费记录</el-button></div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { vipDetail, categoryTwoAmount } from '@/api/member.js'
export default {
  name: 'MembershipDetails',
  components:{Breadcrumb},
  data() {
    return {
      stateShowBread:false,
      historyObj:{},
      titleState: true,
      row: {},
      fit: 'fit',
      vipId:'',
      option:{
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:[]
        },
        series: [
            {
                name:'一级品类',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '20%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    // {value:335, name:'直达', selected:true},
                    // {value:679, name:'营销广告'},
                    // {value:1548, name:'搜索引擎'}
                ]
            },
            {
                name:'二级品类',
                type:'pie',
                radius: ['30%', '40%'],
                label: {
                    normal: {
                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                        backgroundColor: '#eee',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                data:[
                    // {value:335, name:'直达'},
                    // {value:310, name:'邮件营销'},
                    // {value:234, name:'联盟广告'},
                    // {value:135, name:'视频广告'},
                    // {value:1048, name:'百度'},
                    // {value:251, name:'谷歌'},
                    // {value:147, name:'必应'},
                    // {value:102, name:'其他'}
                ]
            }
        ]
      },
      vipObject:{
        score:0,
        balance:0,
      },
      province:'',
      city:'',
      area:'',
    }
  },
  beforeRouteEnter(to, form, next) {
    next(mv => {
      mv.row = to.params.row
      // console.log(mv.row, 'ssssssssssssssssssss')
    })
  },
  mounted() {
    this.stateShowBread = true
    if(JSON.stringify(this.$route.params)=== '{}'){
      this.vipId = this.$store.state.user.vipObject.id
      this.getVipDetail()
    }else{
      console.log(this.$route.params, 'khshdfghfh')
      this.vipId = this.$route.params.id
      this.getVipDetail()
    }
    this.showRow()
    this.goodsChartHandle()
    window.addEventListener("popstate", function(e) {
      // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能

    }, false);
  },
  methods: {
    showRow() {
      console.log(this.row)
    },
    integralDetails() {
      this.$router.push({name: 'integralDetails', params:this.vipObject})
    },
    sellRecords() {
      this.$router.push({name:'expenseCalendar', params:this.vipObject})
    },
    rechargeRecords(){
      this.$router.push({name:'rechargeRecord'})
    },
    goodsChartHandle() {
      var myChart = this.$echarts.init(this.$refs.chart)
      myChart.setOption(this.option)
      let op = this.option
      let _this = this
      myChart.on('click',{seriesName: '一级品类'}, function (params) {
        _this.titleState = false
        let TwoCateArr = []
        let TwoCateName= []
        TwoCateName[0] = params.data.name
       categoryTwoAmount(_this.vipId,params.data.id).then(res => {
         res.info.map(item => {
           let twoObj = {}
           TwoCateName.push(item.categoryName)
           twoObj.name = item.categoryName
           twoObj.value = item.category
           twoObj.id = item.categoryTwoId
           TwoCateArr.push(twoObj)
         })
         op.series[1].data = TwoCateArr
         op.legend.data = TwoCateName
       }).catch(err => {})
        myChart.setOption(op)
      })
    },
    categoryTwoAmount(memberId, categoryOneId){
      categoryTwoAmount(memberId,categoryOneId).then(res => {
        return res.info
      }).catch(err => {})
    },
    // 查询详情
    getVipDetail(){
      vipDetail(this.vipId).then(res => {
        if(res.status === 1){
          this.vipObject = res.info
          this.province = res.info.provinceDomain.name
          this.city = res.info.cityDomain.name
          this.area = res.info.areaDomain.name
          let cateOneArr = []
          res.info.categoryOneAmount.map(item => {
            let ob = {}
            ob.name = item.categoryName
            ob.value = item.category
            ob.id  = item.categoryOneId
            cateOneArr.push(ob)
          })
          // 饼状图
          var myChart = this.$echarts.init(this.$refs.chart)
          let op = this.option
          let nameArr = cateOneArr
          nameArr.map(item => {
            op.legend.data.push(item.name)
          })
          op.series[0].data = nameArr
          myChart.setOption(op)
        }
      }).catch(err => {
        this.$message.error('查询会员详情出错！')
      })
    },
  }
}
</script>

<style scoped>
.div_margin{
  margin:5px;
}
.chartStyle {
  height: 500px;
  /* width:0%; */
  box-sizing: border-box;
  line-height: 500px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  /* margin: 5px; */
  background-color: #FFFF;
}
.echart{
  width:90%;
  height: 100%;
  background-color: #FFFF;
}
</style>
