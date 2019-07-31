<template>
  <div v-if="providerObj.id">
    <p>供应商ID：{{providerObj.id}}</p>
    <p>供应商名称：{{providerObj.name}}</p>
    <div style="display:flex;flex-direction:row;align-items: flex-start;">门头照片：<img :src="providerObj.headerPic" style="width: 200px;height:200px;"/></div>
    <p>联系人：{{providerObj.contactName}}</p>
    <p>手机号：{{providerObj.mobile}}</p>
    <p>座机号：{{providerObj.phone}}</p>
    <p>微信：{{providerObj.wechat}}</p>
    <p>QQ：{{providerObj.qq}}</p>
    <p>邮箱：{{providerObj.email}}</p>
    仓库地址：<span v-if="providerObj.province">{{providerObj.province[0].name}}省</span><span v-if="providerObj.city">{{providerObj.city[0].name}}市</span><span v-if="providerObj.area">{{providerObj.area[0].name}}区/县</span>
    <p>仓库面积：{{providerObj.area}}m<sup>2</sup></p>
    <p>备注：{{providerObj.remark}}</p>
    <p>可配送店铺列表：{{}}</p>
    <p>供应商品：</p>
    <p>资质照片：<img v-for="url in imgList" :src="url" /></p>
    <div>
      评分：
      <div style="margin-left:50px;">
        <span>资质：{{providerObj.remark}}</span>&nbsp;&nbsp;<span>满分=5</span><el-button style="margin-left:20px;" size="mini" type="success">去评分</el-button><br/>
        <span>价格分：{{providerObj.remark}}</span>&nbsp;&nbsp;<span>满分=5</span><br/>
        <span>品质分：{{providerObj.remark}}</span>&nbsp;&nbsp;<span>满分=5</span><br/>
        <span>服务分：{{providerObj.remark}}</span>&nbsp;&nbsp;<span>满分=5</span><br/>
        <span>配送店铺数量分：{{providerObj.remark}}</span>&nbsp;&nbsp;<span>满分=5</span><br/>
      </div>
    </div>
  </div>
</template>
<script>
import {getProviderDetail} from '@/api/provider.js'
export default {
  name: 'providerDetail',
  data() {
    return {
      providerObj:{},
      imgList:[],
    }
  },
  mounted(){
    console.log(this.$route.params,'HHHHHH')
    if(JSON.stringify(this.$route.params)!== '{}') {
      getProviderDetail(this.$route.params.id).then(res => {
        if(res.status === 1){
          this.providerObj = res.info
          this.imgList = this.providerObj.qualificationPics.split(',')
        }else{
          this.$message.error('查询供应商详情出错！')
          window.history.go(-1)
        }
      }).catch(err => {
        console.log(err)
        window.history.go(-1)
        this.$message.error('查询供应商详情失败！')
      })
    }else{
      this.$message.warning('此供应商暂无详情！')
    }
  },
}
</script>
<style>

</style>
