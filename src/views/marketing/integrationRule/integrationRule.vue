<template>
  <div>
    <breadcrumb :stateShow="false"></breadcrumb>
    <div style="margin:20px;">
      <el-button class="button" @click="changeFunction('积分获取')">积分获取</el-button>
      <el-button class="button" @click="changeFunction('积分兑换')">积分兑换/抵扣</el-button>
    </div>
    <div v-if="showState==='积分获取'">
      <span class="font-size" style="color:rgba(16, 16, 16, 1);">消费-积分汇率：
        <span>{{ruleObject.content?ruleObject.content:'1元=10分'}}</span>
      </span>&nbsp;&nbsp;&nbsp;
      <span class="font-size" style="color:rgba(153, 153, 153, 1);">{{ruleObject.status===1?'已启用':'已停用'}}</span>
      <el-button class="button" v-if="ruleObject.status === 1" @click="openRule(0)">停用</el-button>
      <el-button class="button" v-else @click="openRule(1)">启用</el-button>
    </div>
    <div v-else> </div>
    <hint v-model="openScore" :title="scoreTitle" :text="scoreText" @confirm="scoreHandle" />
  </div>
</template>
<script>
import hint from '@/components/Hint'
import virtualList from 'vue-virtual-scroll-list'
import breadcrumb from '@/components/Breadcrumb'
import {getIntegralRule, changeStatus} from '@/api/marketing/integrationRule.js'
export default {
  data(){
    return{
      ruleObject:{},
      openScore:false,
      scoreTitle:'',
      scoreText:'',
      scoreStatus:'',
      showState:'积分获取',
    }
  },
  components:{breadcrumb, hint},
  mounted(){
    this.getRuleHandle()
  },
  methods:{
    // 页面转换
    changeFunction(e){
      this.showState  = e
    },
    getRuleHandle(){
      getIntegralRule().then(res => {
        this.ruleObject = res.info
      }).catch(err => {
        this.$message.error('查询积分规则出错！')
      })
    },
    openRule(e){
      this.scoreStatus = e
      if(e=== 0){
        this.openScore = true
        this.scoreTitle = '停用积分规则'
        this.scoreText = '是否停用该积分规则？'
      }else{
        this.openScore = true
        this.scoreTitle = '启用积分规则'
        this.scoreText = '是否启用该积分规则？'
      }

    },
    scoreHandle(){
      changeStatus(this.ruleObject.id?this.ruleObject.id:1, this.scoreStatus).then(res => {
        if(res.status === 1){
          this.$message.success('操作成功！')
          this.getRuleHandle()
          this.openScore = false
        }
      }).catch(err => {
        this.$message.error('操作出错！')
        this.openScore = false
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
