<template>
  <p>{{time}}</p>
</template>
<script>
  export default{
    data () {
      return {
        time : '',
        flag : false,
        endTime:''
      }
    },
    // props:{
    //   endTime:{
    //     default:'',
    //     type:String,
    //   }
    // },
    mounted () {
      // 每秒执行一次的函数
      let time = setInterval(()=>{
        if(this.flag == true){
          // 方法来停止执行。
          clearInterval(time)
        }
        this.timeDown()
      },500)
    },
    methods:{
      timeDown () {
        this.endTime = new Date().formate('yyyy-mm-dd hh:mm:ss')
        // const nowTime = this.addThreeS(this.endTime)
        let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
        let d = parseInt(leftTime/(24*60*60))
        let h = this.formate(parseInt(leftTime/(60*60)%24))
        let m = this.formate(parseInt(leftTime/60%60))
        let s = this.formate(parseInt(leftTime%60))
        if(leftTime <= 0){
          this.flag = true
          this.$emit('time-end')
        }
        this.time = `${s}秒`     // 需要修改时间样式的话 ，比如需要什么30分钟倒计时，就只保留分和秒
      },
      formate (time) {
        if(time>=10){
          return time
        }else{
          return `0${time}`
        }
      },
    }
  }
</script>
<style>

</style>
