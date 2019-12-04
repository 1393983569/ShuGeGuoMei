<template>
  <div style="display:flex;flex-direction:row;">
    <div class='title'>
      收入构成
    </div>
    <div style="width:100%;background-color:#ffffff;padding:10px;">
      <div style="color:#FFC000;">现金：<el-progress style="margin:5px;" :text-inside="true" :stroke-width="26" :percentage="perxianjin" color="#FFC000"></el-progress></div>
      <div style="color:#8BC34A;"><hr style="border:1px solid #e9e9e9;"/>手机：
        <el-progress :format="formatWx" style="margin:5px;" :text-inside="true" :stroke-width="26" :percentage="perweixin" color="#8BC34A"></el-progress>
        <el-progress :format="formatZfb" style="margin:5px;" :text-inside="true" :stroke-width="26" :percentage="perzhifubao" color="#4BB7F2"></el-progress>
        <el-progress :format="formatQt" style="margin:5px;" :text-inside="true" :stroke-width="26" :percentage="perqita" color="#FF8C75"></el-progress>
      </div>
      <div style="color:#009688;"><hr style="border:1px solid #e9e9e9;"/>余额
      <el-progress style="margin:5px;" :text-inside="true" :stroke-width="26" :percentage="peryue" color="#009688"></el-progress><br/></div>
    </div>
  </div>
</template>
<script>
import {getIncome} from '@/api/dataManage/dataCenter'
export default {
  props:['incomObject'],
  data() {
    return {
      currentData:{},
      perxianjin:0,
      perweixin:0,
      perzhifubao:0,
      perqita:0,
      peryue:0,
    };
  },
  mounted(){
    this.currentData = this.incomObject
    this.getIncomeFunction()
  },
  watch:{
    'incomObject'(e){
      this.currentData = e
      this.getIncomeFunction()
    }
  },
  methods:{
    formatWx(percentage){
      console.log(percentage, 'wx...')
      return `微信${percentage}%`
    },
    formatZfb(percentage){
      return `支付宝${percentage}%`
    },
    formatQt(percentage){
      return `其它${percentage}%`
    },
    getIncomeFunction(){
      getIncome(this.currentData.year,this.currentData.month,this.currentData.day,this.currentData.shopId,).then(res => {
        if(res.status === 1){
          let total = 0
          for(let key in res.info){
            if(key!=='six'){
              total+=res.info[key]
            }
          }
          if(res.info.one!==0){
            this.peryue = ((res.info.one/total)*100).toFixed(2)
          }else{
            this.peryue = 0
          }

          if(res.info.two!==0){
            this.perxianjin = ((res.info.two/total)*100).toFixed(2)
          }else{
            this.perxianjin=0
          }
          if(res.info.three!==0){
            this.perweixin= ((res.info.three/total)*100).toFixed(2)
          }else{
            this.weixin.width =0
          }
          if(res.info.four!==0){
             this.perzhifubao= ((res.info.four/total)*100).toFixed(2)
          }else{
            this.perzhifubao =0
          }
          if(res.info.five!==0){
           this.perqita= ((res.info.five/total)*100).toFixed(2)
          }else{
            this.perqita =0
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
};
</script>
<style>
p {
  /* margin: 10px; */
  margin: 0px;
  padding: 0px;
  text-align: center;
  font-size: 12px;
}
.income_aside {
  width: 100px;
  background-color: #d3dce6;
  line-height: 150px;
  text-align: center;
  color: #333;
  font-size: 16px;
  margin-right: 3px;
  font-weight: normal;
}
.title{
  width:100px;
  height:300px;
  background-color:pink;
  text-align: center;
  line-height: 300px;
  background-color: #D3DCE6;
  color:#333;
  font-size: 16px;
}
</style>
