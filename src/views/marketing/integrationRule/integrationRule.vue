<template>
  <div>
    <breadcrumb :stateShow="false"></breadcrumb>
    <div style="margin:20px;">
      <el-button class="button">积分获取</el-button>
      <el-button class="button">积分兑换/抵扣</el-button>
    </div>
    <div>
      <span class="font-size" style="color:rgba(16, 16, 16, 1);">消费-积分汇率：{{ruleObject.content}}</span>&nbsp;&nbsp;&nbsp;
      <span class="font-size" style="color:rgba(153, 153, 153, 1);" v-if="ruleObject.status === 1">已启用</span>
      <span class="font-size" style="color:rgba(153, 153, 153, 1);" v-else>已停用</span>
      <el-button class="button" v-if="ruleObject.status === 1" @click="openRule(0)">停用</el-button>
      <el-button class="button" v-else @click="openRule(1)">启用</el-button>
    </div>
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import breadcrumb from '@/components/Breadcrumb'
import {getIntegralRule, changeStatus} from '@/api/marketing/integrationRule.js'
export default {
  data(){
    return{
      ruleObject:{},
    }
  },
  components:{breadcrumb},
  mounted(){
    this.getRuleHandle()
  },
  methods:{
    getRuleHandle(){
      getIntegralRule().then(res => {
        this.ruleObject = res.info
      }).catch(err => {
        this.$message.error('查询积分规则出错！')
      })
    },
    openRule(e){
      changeStatus(this.ruleObject.id, e).then(res => {
        if(res.status === 1){
          this.$message.success('操作成功！')
          this.getRuleHandle()
        }
      }).catch(err => {
        this.$message.error('操作出错！')
      })
    }
  }
}
</script>
<style>
.font-size{
  font-size: 14px;
  font-family: SourceHanSansSC-regular;
}
</style>
