<template>
  <div>
    <p>会员ID：</p>
    <p>手机号：</p>
    <p>注册时间：</p>
    <div>
      <div style="display: inline-block; vertical-align: top">头像： </div>
      <el-image
        style="width: 50px; height: 50px; display: inline-block"
        :fit="fit"
        :src="img"
      >
      </el-image>
    </div>
    <p>余额：</p>
    <p>积分：</p>
    <p>性别：</p>
    <p>年龄：</p>
    <p>职业：</p>
    <p>常住小区：</p>
    <p>身份：</p>
    <p>折扣能力：</p>
    <p>级别：</p>
    <div>
      <div style="display: inline-block; vertical-align: top;">
        会员分析：
      </div>
      <div style="display: inline-block; width: 510px; height: 463px; background-color: #f3f2f2">
        <p>平均购买能力：</p>
        <p>最高订单额：</p>
        <p>最低订单额：</p>
        <div>
          <el-row>
            <el-col :span="5">
              <div>复购品类：</div>
            </el-col>
            <el-col :span="19">
              <div style="background-color: #4d4d4d; height: 215px;">11</div>
            </el-col>
          </el-row>
        </div>
        <p>每周进店次数：</p>
        <p>每月进店次数：</p>
      </div>
    </div>
    <p>消费记录：</p>
    <p>充值记录：</p>
  </div>
</template>

<script>
  export default {
    name: 'membershipDetails',
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
