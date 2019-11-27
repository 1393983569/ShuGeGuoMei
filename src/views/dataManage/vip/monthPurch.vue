<template>
  <div style="display:flex;flex-direction:row;width:100%;">
    <div class="item_class">平均购买力（单均价，元）：{{averagePur}}</div>
    <div class='item_class'>复购频次（平均值）：{{count}}次/月</div>
  </div>
</template>
<script>
import {getBuyCount} from '@/api/dataManage/dataCenter.js'
export default {
  props:['countObject'],
  data(){
    return {
      currentData:{},
      count:0,
      averagePur:0,
    }
  },
  mounted(){
    this.currentData = this.countObject
    this.getCountFunction()
  },
  watch:{
    'countObject'(e){
      this.currentData = e
      this.getCountFunction()
    }
  },
  methods:{
    getCountFunction(){
      getBuyCount(this.currentData.year,this.currentData.month,this.currentData.day,this.currentData.shopId,).then(res=> {
        if(res.status === 1){
          console.log(res, 'jhgf.....')
          this.count = res.info.count
          this.averagePur  = res.info.memMoney?res.info.memMoney/100:0
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
.item_class{
  width:48%;
  height: 120px;
  background-color: #ffffff;
  margin:6px;
  /* margin-left:2%; */
  text-align: center;
  line-height: 120px;
  /* color:#333; */
  font-size:20px;
  font-weight: 500;
}
</style>
