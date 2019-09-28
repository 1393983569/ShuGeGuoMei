<template>
  <form name='form' style="margin-right:10px;">
    <div style="diaplay:flex;flex-direction:row;">
      年：<el-select v-model="year" size="mini" class="datePick" @change="getYear">
          <el-option v-for="(item, key) in yearList" :key="key" :value="item" selected>{{item}}</el-option>
      </el-select>
      月：<el-select v-model="month" size="mini" class="datePick" @change="getMonth">
          <el-option v-for="(item, key) in monthList" :key="key" :value="item" selected>{{item}}</el-option>
      </el-select>
      <!-- <span v-if="showDay"> -->
        日：<el-select v-model="day" size="mini" class="datePick" @change="getDay">
          <el-option v-for="(item, key) in dayList" :key="key" :value="item" selected>{{item}}</el-option>
        </el-select>
      <!-- </span> -->

    </div>
  </form>
</template>
<script>
export default {
  name:'datePick',
  data(){
    return {
      year:'',
      month:'',
      day:'',
      monthList:[],
      yearList:[],
      dayList:[],
      tempYear:'',
      tempMonth:'',
      // showDay:false,
    }
  },
  props:{
    yearPro:{
      default:'',
      type:String
    },
    monthPro:{
      default:'',
      type:String
    },
    dayPro:{
      default:'',
      type:String
    }
  },
  watch:{
    'yearPro'(e){
      if(!e){
        this.year = e
        this.month = ''
        this.day = ''
      }
    },
    // 'showDayState'(e){
    //   console.log(e,'xianshizhuagtai')
    //   this.showDay = e
    // }
  },
  mounted(){
    this.setYear()
    // console.log(this.yearPro, this.monthPro, this.dayPro,this.showDayState, 'hahahahahaahh')
  },
  methods:{
    // 网页加载时初始化年月
    setYear(){
      this.yearList = []
      var date = new Date()
      var y = date.getFullYear()
      this.year = y
      this.tempYear = y
      this.setMonth()
      for (var i =(y-20); i <=y+20; i++){
        this.yearList.push(i)
      }
    },
    // 赋月份的下拉框
    setMonth(){
      this.monthList = []
      this.monthList[0] = '整年'
      for (var j = 1; j < 13; j++){
        this.monthList.push(j)
      }
    },
    // 日期下拉框
    setDay(){
      let num = new Date(this.tempYear, this.tempMonth, 0).getDate()
      this.dayList = []
      this.dayList[0] = '整月'
       for (var n =1; n <=num; n++){
        this.dayList.push(n)
      }
    },
    // 年
    getYear(year){
      this.tempYear = year
      this.month = ''
      this.day =''
      this.monthList = []
      this.dayList = []
      this.setMonth()
    },
    // 月
    getMonth(month){
      this.dayList = []
      this.day =''
      if(month === '整年'||month===''){

        this.tempMonth = ''
        this.tempDay = ''
        this.day = ''
        this.dayList = []
        this.handleFinalDate()
      }else{
        this.tempMonth = month
        this.setDay()
      }
    },
    // 号
    getDay(day){
      console.log('day:',day)
      if(day === '整月'||day===''){
        this.tempDay = ''
        this.handleFinalDate()
      }else{
        this.tempDay = day
        this.handleFinalDate()
      }
    },
    // 最终日期
    handleFinalDate(){
      let pickDate = ''
      if(this.tempYear&&this.tempMonth&&this.tempDay){
        pickDate = this.tempYear+'-'+this.tempMonth+'-'+this.tempDay
      }else if(this.tempYear&&this.tempMonth&&!this.tempDay){
        pickDate = this.tempYear+'-'+this.tempMonth
      }else if(this.tempYear&&!this.tempMonth&&!this.tempDay){
         pickDate = this.tempYear
      }
      this.$emit('getPickDate',pickDate )
    }
  }
}
</script>
<style>
.datePick{
  width:90px;
}
</style>
