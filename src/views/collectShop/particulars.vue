<template>
  <div>
    <p>商品ID：</p>
    <p>一级品类：</p>
    <p>二级品类：</p>
    <p>商品名称：</p>
    <div>
      <div style="display: inline-block; vertical-align: top">缩略图： </div>
      <el-image
        style="width: 100px; height: 100px; display: inline-block"
        :fit="fit"
        :src="img"
      >
      </el-image>
    </div>
    <div style="display: block">
      <div style="display: inline-block; vertical-align: top">展示图： </div>
      <el-image
        style="width: 150px; height: 150px; display: inline-block"
        :fit="fit"
        :src="img"
      >
      </el-image>
    </div>
    <p>标签：</p>
    <p>规格：</p>
    <p>单位：</p>
    <p>备注：</p>
    <p>保质期：</p>
    <p>保鲜期：</p>
    <p>产地：</p>
    <p>状态：</p>
    <p>1进价：</p>
    <p>2出价：</p>
    <p>3零售价：</p>
    <div style="margin-left: 30px">
      <span>零售价参考</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'particulars',
    data () {
      return{
        row: {},
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        fit: 'fit'
      }
    },
    beforeRouteEnter (to, form, next) {
      next(mv => {
        mv.row = to.params.row
        console.log(mv.row, 'ssssssssssssssssssss')
      })
    },
    methods: {
      showRow () {
        console.log(this.row)
      }
    },
    mounted () {
      this.showRow()
    }
  }
</script>

<style scoped>

</style>
