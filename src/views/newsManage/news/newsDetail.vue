<template>
  <div>
    <breadcrumb :stateShow="breadState"></breadcrumb>
    <!-- <el-dialog :visible="showDetail" :before-close="handleClose"> -->
      <!-- <div slot="title" class="title-size-color">查看详情</div> -->
      <div class="size-color div-margin"><span class="font-weight">标题：</span>{{ detailtObject.title }}</div>
      <div class="size-color div-margin"><span class="font-weight">发布时间：</span>{{ detailtObject.createTime }}</div>
      <div class="size-color div-margin" style="display:flex;flex-direction:row;align-items:start;">
        <span class="font-weight">缩略图：</span>
        <img :src="detailtObject.thumbnail" style="width:200px;"/>
      </div>
      <div class="size-color div-margin"><span class="font-weight">对象：</span><span v-for="item in detailtObject.shopJson" :key="item.id">{{ item.name }} | </span></div>
      <div class="size-color div-margin"><span class="font-weight">消息类型：</span>{{ detailtObject.category }}</div>
      <div class="size-color div-margin" style="display:flex;flex-direction:row;">
        <span class="font-weight">内容：</span>
        <div style="border:1px solid #909399;width:90%;" v-html="detailtObject.content"/>
      </div>
      <div class="size-color div-margin"><span class="font-weight">发布者：</span>{{ detailtObject.name }}</div>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name:'newsDetail',
  components: { Breadcrumb },
  // props: {
  //   showDetail: {
  //     type: Boolean,
  //     default: false
  //   },
  //   detailtObject: {
  //     type: Object,
  //     default: Array
  //   }
  // },
  data() {
    return {
      releaseperson: '',
      detailtObject:{},
      breadState:false
    }
  },
  mounted() {
    this.breadState = true
    console.log(this.$route.params, 'this.$store ......')
    this.releaseperson = this.$store.state.user.name
    this.detailtObject = this.$route.params
  },
  methods: {
    handleClose() {
      this.$emit('isCloseDetail', false)
    }
  }
}
</script>
<style>

</style>
