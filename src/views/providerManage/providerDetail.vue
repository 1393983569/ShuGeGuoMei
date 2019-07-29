<template>
  <div>
    <p>供应商ID：</p>
    <p>供应商名称：</p>
    <div style="display:flex;flex-direction:row;align-items: flex-start;">门头照片：<img src="http://qiniu-sggm.sandianke.com/1562745072109.jpg" style="width: 200px;height:200px;"/></div>
    <p>联系人：</p>
    <p>手机号：</p>
    <p>座机号：</p>
    <p>微信：</p>
    <p>QQ：</p>
    <p>邮箱：</p>
    <p>仓库地址：</p>
    <p>仓库面积：</p>
    <p>备注：</p>
    <p>可配送店铺列表：</p>
    <p>供应商品：</p>
    <p>资质照片：</p>
    <div>
      评分：
      <div style="margin-left:50px;">
        <span>资质：</span>&nbsp;&nbsp;<span>满分=5</span><el-button style="margin-left:20px;" size="mini" type="success">去评分</el-button><br/>
        <span>价格分：</span>&nbsp;&nbsp;<span>满分=5</span><br/>
        <span>品质分：</span>&nbsp;&nbsp;<span>满分=5</span><br/>
        <span>服务分：</span>&nbsp;&nbsp;<span>满分=5</span><br/>
        <span>配送店铺数量分：</span>&nbsp;&nbsp;<span>满分=5</span><br/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'providerDetail',
  data() {
    return {}
  },
  mounted(){
    this.$route.params
  },
}
</script>
<style>

</style>
