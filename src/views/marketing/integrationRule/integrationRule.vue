<template>
  <div>
    <breadcrumb :stateShow="false"></breadcrumb>
    <div style="margin:20px;">
      <el-button class="button">积分获取</el-button>
      <el-button class="button">积分兑换/抵扣</el-button>
    </div>
    <div>
      <span class="font-size" style="color:rgba(16, 16, 16, 1);">消费-积分汇率：1元=10分</span>&nbsp;&nbsp;&nbsp;<span class="font-size" style="color:rgba(153, 153, 153, 1);">已停用</span> <el-button class="button">启用</el-button>
    </div>
  </div>
</template>
<script>
import breadcrumb from '@/components/Breadcrumb'
export default {
  data(){
    return{}
  },
  components:{breadcrumb}
}
</script>
<style>
.font-size{
  font-size: 14px;
  font-family: SourceHanSansSC-regular;
}
</style>
