<template>
  <div style="margin:20px;">
    <div style="display:flex;flex-direction:row;justify-content:flex-end;">
      <el-button style="margin-right:20px;">取消</el-button>
      <el-button>确定</el-button>
    </div>
    <div class="size-color" style="margin:10px;">标题：&nbsp;&nbsp;&nbsp;&nbsp;<el-input style="width:500px;" placeholder="单行输入" /></div>
    <div class="size-color" style="margin:10px;">
      轮播图：
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    <div style="margin:10px;display:flex;align-items:flex-start;font-weight:bold;">
      <div>内容：</div>&nbsp;&nbsp;&nbsp;&nbsp;<tinymce v-model="content" :height="300" :width="700" />
    </div>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data() {
    return {
      // 富文本内容
      content: '',
      // 图片上传
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style>

</style>
