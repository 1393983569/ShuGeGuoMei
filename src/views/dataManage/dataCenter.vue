<template>
  <div>
    <breadcrumb :stateShow="false"></breadcrumb>
    <div style="margin:10px;display:flex;flex-direction: row;font-size:18px;color:#6e7b99;font-weight:bold;align-items:center;">
      <pickDate @getPickDate="getPickDate" :yearPro="yearPro" :monthPro="monthPro" :dayPro="dayPro"></pickDate>&nbsp;
      店铺名称：
      <el-select v-model="shopId" clearable>
        <el-option v-for="item in shopList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div style="position:absolute;right:10px;">
        <el-button type="primary" size="mini" @click="searchFunction">搜索</el-button>
        <el-button type="info" size="mini" @click="clearFunction">清空</el-button>
      </div>
    </div>
    <!-- 营业概况 -->
    <div style="font-weight:bold;margin:10px;margin-top:30px;">
      经营分析
    </div>
    <div><business :bus-obj="dataObject" lazy></business></div><br>
    <div><jingying-data :jyObject="dataObject"></jingying-data></div><br/>
    <div v-if="slideState>=1"><income :incomObject="dataObject"></income></div><br/>
    <div v-if="slideState>=1"><incomTrend :incomeTrend="dataObject" /></div><br>
    <div v-if="slideState>=2"><lossData :lossObject="dataObject" /></div><br>
    <div v-if="slideState>=3"><goodsData :goodsObject="dataObject" /></div>
    <div v-if="slideState>=3"><goodsCate :goodsSale="dataObject"></goodsCate></div>
    <div v-if="slideState>=4" style="font-weight:bold;margin:10px;margin-top:30px;">盈亏分析</div>
    <div v-if="slideState>=4" style="margin-top:4px;"><promitLoss :incomLoss="dataObject"/></div>
    <br>
    <div v-if="slideState>=5">
      <incomeLoss :ykObject="dataObject"></incomeLoss>
    </div>
    <div  v-if="slideState>=6" style="font-weight:bold;margin:10px;margin-top:30px;">会员分析</div>
    <div  v-if="slideState>=6" style="margin-top:4px;"><vip :vipObject="dataObject" /></div><br/>
    <div  v-if="slideState>=7"><monthPurch :countObject="dataObject"></monthPurch></div><br/>
    <div  v-if="slideState>=8"><frequency :categoryObject="dataObject"></frequency></div>
    <div v-if="slideState<=8" style="width:100%;display: flex;flex-direction:row-reverse;align-items: center;">
      <div :title="loadTitle" @click="slideFunction" style="position: fixed;top:80%;background-color: #fff;width:50px;height:50px;border-radius: 50%;color: #409eff;display: flex;flex-direction:row-reverse;align-items: center;justify-content: center;font-size: 20px;box-shadow: 0 0 6px rgba(0,0,0,.12);cursor: pointer;z-index:100;">
        <i style="font-size:30px;" class="el-icon-caret-bottom"></i>
      </div>
    </div>
    <el-divider v-if="slideState>=8" style="background-color:rag(246, 246, 246)">我是有底线的</el-divider>
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import { getAllShop } from '@/api/shop.js'
import incomTrend from './jingying/incomTrend.vue'
import jingyingData from './jingying/jingyingData.vue'
import incomeLoss from './promitLoss/incomeLoss.vue'
import goodsCate from './jingying/goodsCate.vue'
import income from './jingying/income.vue'
import business from './jingying/business.vue'
import lossData from './jingying/lossData.vue'
import goodsData from './jingying/goodsData.vue'
import promitLoss from './promitLoss/promitLoss.vue'
import frequency from './vip/frequency.vue'
import monthPurch from './vip/monthPurch.vue'
import pickDate from '@/components/pickDate'
import breadcrumb from '@/components/Breadcrumb'
import vip from './vip/vipData.vue'

export default {
  components: { incomTrend, lossData, goodsData,
    promitLoss, vip, pickDate,breadcrumb,
    jingyingData, business, income, goodsCate, incomeLoss,frequency,monthPurch },
  data() {
    return {
      shopList: [],
      shopId: '',
      yearPro:'',
      monthPro:'',
      dayPro:'',
      dataObject:{},
      slideState:0,
      loadTitle:'点击加载未加载统计图'
    }
  },
  mounted() {
    this.getAllShop()
    window.scrollY = 500

  },
  methods: {
    slideFunction(){
      this.slideState+=1
      this.dataObject.slideState = this.slideState
      window.scrollTo(100,window.scrollY+=430);
      if(this.slideState>8){
        window.alert('统计图已加载完！')
        this.loadTitle = '统计图已加载完！'
      }
    },
    searchFunction(){
      let obj = {}
      obj.year = this.yearPro
      obj.month = this.monthPro
      obj.day = this.dayPro
      obj.shopId = this.shopId
      this.dataObject = obj
    },
    clearFunction(){
      let obj = {}
      obj.year = ''
      obj.month = ''
      obj.day = ''
      obj.shopId = ''
      this.shopId = ''
      this.yearPro = ''
      this.monthPro = ''
      this.dayPro = ''
      this.dataObject = obj
    },
    getPickDate(date){
      date = date+'-'
      let dateArr = date.split('-')
      if(dateArr.length === 2){
        this.yearPro = dateArr[0]
        this.monthPro = ''
        this.dayPro = ''
      }else if(dateArr.length === 3) {
        this.yearPro = dateArr[0]
        this.monthPro = dateArr[1]
        this.dayPro = ''
      }else if(dateArr.length === 4){
        this.yearPro = dateArr[0]
        this.monthPro = dateArr[1]
        this.dayPro = dateArr[2]
      }
    },
    // 查询所有商铺
    getAllShop() {
      getAllShop().then(res => {
        if (res.status === 1) {
          this.shopList = res.info
        } else {
          this.$message.error('查询店铺失败')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询店铺失败')
      })
    }
  }
}
</script>
<style>
.asideClass {
  color: #333;
  /* background-color: #CCCCCC; */
  text-align: center;
  line-height:200px;
  margin:0px;
  padding:0px;
}
.el-main {
  display:flex;
  flex-direction: row;
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
  margin:0px;
  padding:0px;
}
.item{
  /* display: flex; */
  align-items: center;
  width:220px;
  text-align: center;
}
body{
  background-color: #F6F6F6;
}
</style>
