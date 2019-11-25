<template>
  <div>
    <breadcrumb :stateShow="false"></breadcrumb>
    <div style="margin:10px;display:flex;flex-direction: row;font-size:18px;color:#6e7b99;font-weight:bold;align-items:center;">
      <pickDate @getPickDate="getPickDate" :yearPro="yearPro" :monthPro="monthPro" :dayPro="dayPro"></pickDate>&nbsp;
      店铺名称：
      <el-select v-model="shopId">
        <el-option v-for="item in shopList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <el-button type="primary" @click="searchFunction">搜索</el-button>
    </div>
    <!-- 营业概况 -->
    <business :bus-obj="dataObject"></business><br>
    <div><jingying-data :jyObject="dataObject"></jingying-data></div><br/>
    <div><incomTrend /></div><br>
    <div><lossData /></div><br><div><goodsData /></div><br>
    <div class="font-weight">盈亏分析</div>
    <div style="margin-top:4px;"><promitLoss /></div>
    <br>
    <div class="font-weight">会员分析</div>
    <div style="margin-top:4px;"><vip /></div>
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import { getAllShop } from '@/api/shop.js'
import incomTrend from './jingying/incomTrend.vue'
import jingyingData from './jingying/jingyingData.vue'
import business from './jingying/business.vue'
import lossData from './jingying/lossData.vue'
import goodsData from './jingying/goodsData.vue'
import promitLoss from './promitLoss/promitLoss.vue'
import pickDate from '@/components/pickDate'
import breadcrumb from '@/components/Breadcrumb'
import vip from './vip/vipData.vue'

export default {
  components: { incomTrend, lossData, goodsData, promitLoss, vip, pickDate,breadcrumb, jingyingData, business },
  data() {
    return {
      shopList: [],
      shopId: '',
      yearPro:'',
      monthPro:'',
      dayPro:'',
      dataObject:{},
    }
  },
  mounted() {
    this.getAllShop()

  },
  methods: {
    searchFunction(){
      let obj = {}
      obj.year = this.yearPro
      obj.month = this.month
      obj.day = this.day
      obj.shopId = this.shopId
      this.dataObject = obj
    },
    getPickDate(date){
      date = date+'-'
      let dateArr = date.split('-')
      if(dateArr.length === 2){
        this.yearPro = dateArr[0]
      }else if(dateArr.length === 3) {
        this.yearPro = dateArr[0]
        this.monthPro = dateArr[1]
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
          this.shopId = this.shopList[0].id
          this.dataObject.shopId = this.shopId
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
