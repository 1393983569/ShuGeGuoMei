<template>
  <!-- <div class="body-margin" style="display:float;"> -->
  <div class="body-margin">
    <el-form ref="ADForm" :model="ADForm" :rules="rules" label-width="100px">
      <!-- <div style="float:left;"> -->
      <div>
        <el-form-item label="标题" prop="tile">
          <el-input v-model="ADForm.tile" style="width:400px;" />
        </el-form-item>
        <el-form-item label="轮播图" prop="dialogImageUrl">
         <el-upload
          class="avatar-uploader"
          action="http://192.168.31.51:8083//basics/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="ADForm.imge" :src="ADForm.imge" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <tinymce v-model="ADForm.content" :height="300" :width="700" />
        </el-form-item>
      </div>
      <!-- <el-form-item style="float:right;"> -->
      <el-form-item>
        <el-button type="warning" @click="resetForm('ADForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ADForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { addAdvertisement } from '@/api/advertisement.js'
export default {
  name: 'ADRelease',
  components: { Tinymce },
  data() {
    return {
      picture: [],
      // 富文本内容
      content: '',
      // 图片上传
      dialogImageUrl: '',
      dialogVisible: false,
      ADForm: {
        tile: '',
        imge: '',
        content: ''
      },
      rules: {
        tile: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        imge: [{ required: true, message: '请上传轮播图', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  watch: {},
  methods: {
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.ADForm.dialogImageUrl = ''
      this.dialogVisible = true
      this.ADForm.imge = file.response.info
    },
    beforeAvatarUpload() {},
    handleAvatarSuccess(res) {
      console.log(res, 'gggggg')
      this.ADForm.imge = res.info
    },
    submitForm(formName) {
      console.log(formName, 'formName....')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发布广告接口
          addAdvertisement(this.ADForm).then(res => {
            console.log(res, 'ggggggg')
            this.$message.success('添加广告成功！')
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
