<template>
  <div>
      <el-container>
        <el-aside width="100px" class="asideClass">
          营业概况
        </el-aside>
        <el-main>
          <div class="item">
            <div style="font-size:30px;color:#ffa96a;margin-top:50px;">

              <span v-if="this.businessObj.newTotal/100>=10000">{{this.businessObj.newTotal/1000000}}万</span>
              <span v-else>{{this.businessObj.newTotal/100}}</span>
            </div><br>
            <div style="font-size:18px;color:6e7b99;">实收金额（元）</div>
          </div>
          <div class="item">
            <div style="font-size:30px;color:#ffa96a;margin-top:50px;">+
              <span v-if="this.businessObj.increaseMoney/100>=10000">{{this.businessObj.increaseMoney/1000000}}万</span>
              <span v-else>{{this.businessObj.increaseMoney/100}}</span>
            </div><br>
            <div v-if="this.businessObj.oldTotal!==0">{{this.businessObj.newTotal/this.businessObj.oldTotal}}%</div>
            <div v-else>0%</div>
            <div>比上年</div>
          </div>
          <div class="item">
            <div style="font-size:30px;color:#ffa96a;margin-top:50px;">{{this.businessObj.orderNumber}}</div><br>
            <div>总单量（单）</div>
          </div>
          <div class="item">
            <div style="font-size:30px;color:#ffa96a;margin-top:50px;">{{this.businessObj.avgOrder?this.businessObj.avgOrder/100:0}}</div><br>
            <div>单均价（元）</div>
          </div>
          <div class="item">
            <div style="font-size:30px;color:#ffa96a;margin-top:50px;">{{this.businessObj.memberNumber}}</div><br>
            <div>会员人数（人）</div>
          </div>
          <div class="item">
            <div style="font-size:30px;color:#ffa96a;margin-top:50px;">
              0
            </div><br>
            <div>非会员人数（人）</div>
          </div>
        </el-main>
      </el-container>
    </div>
</template>
<script>
import {getBusiness} from '@/api/dataManage/dataCenter'
export default {
  props:['busObj'],
  data(){
    return {
      businessObj:{
        orderNumber: 0,
        memberNumber: 0,
        oldTotal: 0,
        newTotal: 0,
        increaseMoney: 0
      },
      currentData:{}
    }
  },
  mounted(){
    this.currentData = this.busObj
    this.getBusinessFunction()
  },
  watch:{
    'busObj'(e){
      this.currentData = e
      this.getBusinessFunction()
    }
  },
  methods:{
    getBusinessFunction(){
      console.log(this.currentData.shopId, 'data.....bus....')
      getBusiness(this.currentData.year, this.currentData.month, this.currentData.day, this.currentData.shopId).then(res => {
        if(res.status === 1){
          this.businessObj = res.info
        }
      }).catch(err => {
        console.log(err)
      })
    },
  },
}
</script>
<style>

</style>
