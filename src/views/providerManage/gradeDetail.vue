<template>
  <div>
    <!-- <div>
      <span>评分：{{grades.total}}</span>&nbsp;&nbsp;<span>满分=5</span>
    </div> -->
    <div>
      <span>资质：{{grades.qualification}}</span>&nbsp;&nbsp;<span>满分=5</span>
    </div>
    <div>
      <span>价格分：{{grades.price}}</span>&nbsp;&nbsp;<span>满分=5</span>
    </div>
    <div>
      <span>品质分：{{grades.quality}}</span>&nbsp;&nbsp;<span>满分=5</span>
    </div>
    <div>
      <span>服务分：{{grades.service}}</span>&nbsp;&nbsp;<span>满分=5</span>
    </div>
    <div>
      <span>配送店铺数量分：{{grades.amount}}</span>&nbsp;&nbsp;<span>满分=5</span>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    grade:{
      default:()=>{},
      type:Object
    }
  },
  data(){
    return{
      grades:{}
    }
  },
  watch:{
    'grade'(res){
      // console.log(res,'res.......')
      this.grades = res
      this.grades.total = (res.qualification+res.price+res.quality+res.service+res.amount)/5
      this.$emit('getTotal', this.grades.total)
    }
  }
}
</script>
