<template>
  <div>
    <el-dialog :visible="showAdDetail" :before-close="handleClose">
      <div slot="title" class="title-size-color" style="margin:10px;">广告详情</div>
      <div class="size-color" style="margin:10px;">标题：</div>
      <div class="size-color" style="margin:10px;">轮播图：</div>
      <div class="size-color" style="margin:10px;">发布时间：</div>
      <div class="size-color" style="margin:10px;">内容：</div>
      <div class="size-color" style="margin:10px;">状态：</div>
      <div class="size-color" style="margin:10px;">发布者：</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    showAdDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // showAdDetail: '',
    }
  },
  methods: {
    handleClose() {
      // this.showAdDetail = false
      this.$emit('handleClose', false)
    }
  }
}
</script>
<style></style>
