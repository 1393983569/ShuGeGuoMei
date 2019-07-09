<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="120px">
      <el-form-item label="供应商名称：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入供应商名称" style="width:400px;"/>
      </el-form-item>
      <el-form-item label="门头照片：" prop="headerPic">
        <el-upload
          class="avatar-uploader"
          :action="`${apiUrl}/basics/upload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.headerPic" :src="ruleForm.headerPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm:{
        name: '',
        headerPic: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' },
        ],
      },
      apiUrl: ''
    }
  },
  mounted() {
    this.apiUrl = process.env.VUE_APP_BASE_API
  },
  methods: {
    handleAvatarSuccess(file) {
      console.log(file, 'hhhh')
      this.ruleForm.headerPic = file.info
    },
    beforeAvatarUpload(file) {

    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #b3b3b3;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
