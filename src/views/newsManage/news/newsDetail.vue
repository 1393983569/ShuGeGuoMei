<template>
  <div style="margin:20px;">
    <el-dialog :visible="showDetail" :before-close="handleClose">
      <div slot="title" class="title-size-color">查看详情</div>
      <div class="size-color" style="margin:10px;">标题：</div>
      <div class="size-color" style="margin:10px;">发布时间：</div>
      <div class="size-color" style="margin:10px;">对象：</div>
      <div class="size-color" style="margin:10px;">消息类型：</div>
      <div class="size-color" style="margin:10px;">内容：</div>
      <div class="size-color" style="margin:10px;">发布者：</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    showDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$emit('isCloseDetail', false)
    }
  }
}
</script>
<style></style>
