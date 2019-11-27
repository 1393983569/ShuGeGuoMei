<template>
  <div style="width:100%;height:150px;display:flex;flex-direction:row;color:#333;font-size:16px;font-weight:bold;background-color:#ffffff;">
    <div class="income_aside">收入构成</div>
    <div style="width:90%;padding-top:20px;">
      <div style="width:100%;display:flex;flex-direction:row;">
        <p :style="xianjinTitle" v-if="xianjinTitle.width!=='0.00%'">现金</p>
        <p style="width:1px;height:30px;border-left:2px solid #FFC000;" v-else>现金</p>
        <p :style="phoneTitle">手机</p>
        <p :style="moneyTitle" v-if="moneyTitle.width!=='0.00%'">余额</p>
        <p style="width:1px;height:30px;border-left:2px solid #FFC000;margin-left:10px" v-else>余额</p>
      </div>
      <div style="width:100%;display:flex;flex-direction:row;">
        <p :style="xianjin">{{xianjin.width?xianjin.width:'0'}}</p>
        <p :style="weixin">{{weixin.width?weixin.width:'0'}}</p>
        <p :style="zhifubao">{{zhifubao.width?zhifubao.width:'0'}}</p>
        <p :style="qita">{{qita.width?qita.width:'0'}}</p>
        <p :style="money">{{money.width==='0.00%'?'':money.width}}</p>
      </div>
      <div style="width:100%;display:flex;flex-direction:row;">
        <p :style="xianjinTitle"></p>
        <p :style="weixinTitle" v-if="weixinTitle.width!=='0.00%'">微信</p>
        <p :style="zhifubaoTitle" v-if="zhifubaoTitle.width!=='0.00%'">支付宝</p>
        <p :style="qitaTitle" v-if="qitaTitle.width!=='0.00%'">其它</p>
        <p :style="moneyTitle"></p>
      </div>
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
      xianjin: {
        width: "10%",
        // color:'#ffffff',
        backgroundColor: "#FFC000",
        textAlign:'center',
        lineHeight:'25px',
        height: "25px",
      },
      money: {
        width: "30%",
        // color:'#ffffff',
        backgroundColor: "#009688",
        textAlign:'center',
        lineHeight:'25px',
        height: "25px"
      },
      weixin: {
        width: "10%",
        backgroundColor: "#8BC34A",
        // color: "#ffffff",
        height: "25px",
        textAlign:'center',
        lineHeight:'25px',
      },
      zhifubao: {
        width: "20%",
        // color: "#ffffff",
        backgroundColor: "#4BB7F2",
        textAlign:'center',
        lineHeight:'25px',
        height: "25px"
      },
      qita: {
        width: "30%",
        // color: "#ffffff",
        backgroundColor: "#FF8C75",
        textAlign:'center',
        lineHeight:'25px',
        height: "25px"
      },
      xianjinTitle:{
        height:'30px',
        borderRight:'2px solid #FFC000',
        width:'10%',
      },
      phoneTitle:{
        height:'30px',
        width:'60%'
      },
      weixinTitle:{
        width:'10%',
        height:'30px',
      },
      zhifubaoTitle:{
        width:'20%',
        height:'30px',
      },
      qitaTitle:{
        width:'30%',
        // borderRight:'2px solid #FFC000',
      },
      moneyTitle:{
        height:'30px',
        width:'30%',
        borderLeft:'2px solid #FFC000',
      }
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
    getIncomeFunction(){
      getIncome(this.currentData.year,this.currentData.month,this.currentData.day,this.currentData.shopId,).then(res => {
        if(res.status === 1){
          let total = 0
          for(let key in res.info){
            if(key!=='six'){
              total+=res.info[key]
            }
          }


          let phoneTotal = res.info.three+res.info.four+res.info.five
          this.phoneTitle.width=((phoneTotal/total)*100).toFixed(2).toString()+'%'

          this.xianjin.width = ((res.info.two/total)*100).toFixed(2).toString()+'%'
          this.money.width = ((res.info.one/total)*100).toFixed(2).toString()+'%'
          this.weixin.width= ((res.info.three/total)*100).toFixed(2).toString()+'%'
          this.zhifubao.width= ((res.info.four/total)*100).toFixed(2).toString()+'%'
          this.qita.width= ((res.info.five/total)*100).toFixed(2).toString()+'%'

          this.xianjinTitle.width = this.xianjin.width
          this.moneyTitle.width = this.money.width
          this.weixinTitle.width= ((res.info.three/total)*100).toFixed(2).toString()+'%'
          this.zhifubaoTitle.width= ((res.info.four/total)*100).toFixed(2).toString()+'%'
          this.qitaTitle.width= ((res.info.five/total)*100).toFixed(2).toString()+'%'
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
</style>
