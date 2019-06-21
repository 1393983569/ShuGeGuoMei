<template>
  <!-- <div class="body-margin" style="display:float;"> -->
  <div class="body-margin">
    <el-form ref="ADForm" :model="ADForm" :rules="rules" label-width="100px">
      <!-- <div style="float:left;"> -->
      <div>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ADForm.title" style="width:400px;" />
        </el-form-item>
        <el-form-item label="轮播图" prop="url">
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
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <tinymce v-model="ADForm.content" :height="300" :width="700" />
        </el-form-item>
      </div>
      <!-- <el-form-item style="float:right;"> -->
      <el-form-item>
        <el-button @click="resetForm('ADForm')">取消</el-button>
        <el-button @click="submitForm('ADForm')">确定</el-button>
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
      // 富文本内容
      content: '',
      // 图片上传
      dialogImageUrl: '',
      dialogVisible: false,
      ADForm: {
        title: '',
        viewpager: '',
        content: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        url: [{ required: true, message: '请上传轮播图', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.ADForm.url = file.url
      this.dialogVisible = true
    },
    submitForm(formName) {
      console.log(formName, 'formName....')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发布广告接口
          addAdvertisement(this.ADForm).then(res => {
            console.log(res, 'ggggggg')
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

</style>
