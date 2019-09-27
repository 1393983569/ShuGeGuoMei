<template>
  <!-- <div class="body-margin" style="display:float;"> -->
  <div class="body-margin">
    <el-form ref="ADForm" :model="ADForm" :rules="rules" label-width="100px">
      <!-- <div style="float:left;"> -->
      <div>
        <el-form-item label="标题" prop="tile">
          <el-input v-model="ADForm.title" style="width:400px;" />
        </el-form-item>
        <el-form-item label="轮播图" prop="imge">
         <el-upload
          class="avatar-uploader"
          :action="`${apiUrl}/basics/upload`"
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
        <div v-if="addEditState">
          <el-button type="warning" @click="resetForm('ADForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ADForm')">确定</el-button>
        </div>
        <div v-else>
          <el-button type="warning" @click="resetForm('ADForm')">取消</el-button>
          <el-button type="primary" @click="submitEditForm('ADForm')">修改</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { addAdvertisement, editAdvertisement } from '@/api/advertisement.js'
export default {
  name: 'ADRelease',
  components: { Tinymce },
  // props: {
  //   editObject:{
  //     type: Object,
  //     default: function() {}
  //   }
  // },
  data() {
    return {
      picture: [],
      // 富文本内容
      content: '',
      // 图片上传
      dialogImageUrl: '',
      dialogVisible: false,
      ADForm: {
        title: '',
        imge: '',
        content: '',
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        imge: [{ required: true, message: '请上传轮播图', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      apiUrl: '',
      addEditState: false,
    }
  },
  mounted() {
    this.apiUrl = process.env.VUE_APP_BASE_API
    if(JSON.stringify(this.$route.params) !=="{}"){
      console.log(this.$route.params, 'llllll')
      this.ADForm = this.$route.params.row
      this.addEditState = false
    }else {
      this.addEditState = true
    }
  },
  watch: {
    'editObject'(e){
      console.log(e)
    }
  },
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
    beforeAvatarUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 1;
      if (!isLt20M) {
              this.$message.error('上传图片的大小不能超过 1M!');
      }
      this.valWidthAndHeight(file)
      if(this.valWidthAndHeight(file)){
        console.log('true.......')
      }
      console.log(this.valWidthAndHeight(file), 'function.......')
    },
    //验证图片宽高
    valWidthAndHeight:function(file){
      let _this =this
      let valid = false
      new Promise(function(resolve, reject) {
        // let width = _this.validWidth  //图片宽度
        // let height = _this.validHeight ; //图片高度
        let _URL = window.URL || window.webkitURL;
        let image = new Image();
        image.src = _URL.createObjectURL(file);
        image.onload = function() {
          console.log(image.height,image.width, 'img......')
          if(image.width == 3*image.height){
            valid = true
          }else{

          }
          valid ? resolve() : reject();
        };
      }).then(
        () => {
          return file;
        },
        () => {
          this.$message.error("上传图片尺寸不符合,只能是3（宽）：1（高）");
        }
      );
      return valid
    },
    handleAvatarSuccess(res) {
      console.log(res, 'gggggg')
      this.ADForm.imge = res.info
    },
    submitForm(formName) {
      // console.log(formName, 'formName....')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发布广告接口
          addAdvertisement(this.ADForm).then(res => {
            this.$message.success('添加广告成功！')
            window.history.go(-1)
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
    },
    submitEditForm(formName) {
      // console.log(formName, 'formName....')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发布广告接口
          console.log(this.ADForm, '^^^^^^')
          // return
          if(this.ADForm.status === '上架') {
            this.ADForm.status = 0
          } else {
            this.ADForm.status = 1
          }
          editAdvertisement(this.ADForm).then(res => {
            this.$message.success('编辑成功！')
            window.history.go(-1)
          }).catch(err => {
            console.log(err)
            this.$message.error('编辑失败！')
          })
        } else {
          return false
        }
      })
    },
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
