<template>
  <div>
    <breadcrumb :stateShow="breadState"></breadcrumb>
    <!-- <el-dialog :visible="showAdDetail" :before-close="handleClose"> -->
      <!-- <div slot="title" class="title-size-color" style="margin:10px;">广告详情</div> -->
      <div class="size-color div-margin"><span class="font-weight">标题：</span>{{ adObject.title }}</div>
      <div class="size-color div-margin font-weight" style="display:flex;flex-direction:row;align-items:flex-start;">轮播图：<img :src="adObject.imge" style="width:100px;height:100px;"/></div>
      <div class="size-color div-margin"><span class="font-weight">发布时间：</span>{{ adObject.createTime }}</div>
      <div class="size-color div-margin" style="display:flex;flex-direction:row;align-items:flex-start;"><span class="font-weight">内容：</span><span v-html="adObject.content"></span></div>
      <div class="size-color div-margin"><span class="font-weight">状态：</span>{{ adObject.status }}</div>
      <div class="size-color div-margin"><span class="font-weight">发布者：</span>{{ adObject.adminName }}</div>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  // props: {
  //   showAdDetail: {
  //     type: Boolean,
  //     default: false
  //   },
  //   adObject: {
  //     type: Object,
  //     default: ()=>{}
  //   },
  //   adminName:{
  //     default:'',
  //     type:String
  //   }
  // },
  name:'ADDetail',
  components: { Breadcrumb },
  data() {
    return {
      // showAdDetail: '',
      releasePerson: '',
      adObject:{},
      breadState:false,
    }
  },
  watch:{
    'adminName'(e){
      this.releasePerson = e
    }
  },
  mounted() {
    this.breadState = true
    console.log( this.$route.params, 'llllllll')
    this.adObject = this.$route.params
    // this.releasePerson = this.$store.state.user.name
  },
  methods: {
    handleClose() {
      // this.showAdDetail = false
      this.$emit('handleClose', false)
    }
  }
}
</script>
<style>
/* .a{
  display: inline;
  top
} */
</style>
