<template>
  <div style="diaplay:flex;flex-direction:row;">
      年：<el-select v-model="year" size="mini" class="datePick" @change="getYear">
          <el-option v-for="(item, key) in yearList" :key="key" :value="item" selected>{{item}}</el-option>
      </el-select>
      月：<el-select v-model="month" size="mini" class="datePick" @change="getMonth">
          <el-option v-for="(item, key) in monthList" :key="key" :value="item" selected>{{item}}</el-option>
      </el-select>
    </div>
</template>
<script>
export default {
  data(){
    return{
      year:'',
      month:'',
      monthList:[],
      yearList:[],
      tempYear:'',
      tempMonth:'',
    }
  },
  props:{
    stateShow:{
      default:false,
      type:Boolean
    }
  },
  watch:{
    'stateShow'(e){
      console.log(e, 'stette////')
      if(e){
        this.year = ''
        this.month = ''
      }
    }
  },
  mounted(){

    // console.log('mmmm')
    this.setYear()
    this.setMonth()
  },
  methods:{
    // 网页加载时初始化年月
    setYear(){
      this.yearList = []
      var date = new Date()
      var y = date.getFullYear()
      for (var i =(y-10); i <=y+100; i++){
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
    // 年
    getYear(year){
      this.tempYear = year
      this.month = ''
      this.setMonth()
    },
    // 月
    getMonth(month){
      console.log(month, this.tempYear)
      if(month === '整年'||month===''){
        this.tempMonth =''
        this.handleFinalDate()
      }else{
        this.tempMonth = month
        this.handleFinalDate()
      }
    },
    // 最终日期
    handleFinalDate(){
      let pickDate = ''
      if(this.tempYear&&this.tempMonth){
        pickDate = this.tempYear+'-'+this.tempMonth
      }else if(this.tempYear&&!this.tempMonth){
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

