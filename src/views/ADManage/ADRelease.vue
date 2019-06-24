<template>
  <!-- <div class="body-margin" style="display:float;"> -->
  <div class="body-margin">
    <el-form ref="ADForm" :model="ADForm" :rules="rules" label-width="100px">
      <!-- <div style="float:left;"> -->
      <div>
        <el-form-item label="标题" prop="tile">
          <el-input v-model="ADForm.tile" style="width:400px;" />
        </el-form-item>
        <el-form-item label="轮播图" prop="imge">
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
      // 富文本内容
      content: '',
      // 图片上传
      dialogImageUrl: '',
      dialogVisible: false,
      ADForm: {
        tile: '',
        imge: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555915007260&di=16a2e0ba1a7ab1e77c9d4cf59328e98c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-05%2F5a4f43d14f85a.jpg',
        content: ''
      },
      rules: {
        tile: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        // url: [{ required: true, message: '请上传轮播图', trigger: 'blur' }],
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
      // this.dialogImageUrl = file.url
      // this.dialogImageUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555915007260&di=16a2e0ba1a7ab1e77c9d4cf59328e98c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-05%2F5a4f43d14f85a.jpg'
      // this.ADForm.url = file.url
      // this.ADForm.imge = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555915007260&di=16a2e0ba1a7ab1e77c9d4cf59328e98c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-05%2F5a4f43d14f85a.jpg'
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
