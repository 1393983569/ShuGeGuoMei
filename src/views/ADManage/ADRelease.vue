<template>
  <!-- <div class="body-margin" style="display:float;"> -->
  <div class="body-margin">
    <Breadcrumb>
      <div v-if="addEditState">
        <el-button size="mini" type="primary" @click="submitForm('ADForm')" :loading="addLoading">确定</el-button>
        <el-button size="mini" type="warning" @click="resetForm('ADForm')">取消</el-button>
      </div>
      <div v-else>
        <el-button size="mini" type="primary" @click="submitEditForm('ADForm')" :loading="editLoading">修改</el-button>
        <el-button size="mini" type="warning" @click="resetForm('ADForm')">取消</el-button>
      </div>
    </Breadcrumb>
    <el-form ref="ADForm" :model="ADForm" :rules="rules" label-width="100px">
      <!-- <div style="float:left;"> -->
      <div>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ADForm.title" style="width:400px;" />
        </el-form-item>
        <el-form-item label="轮播图" prop="imge">
         <div style="dispaly:flex;">
           <el-upload
            class="avatar-uploader"
            :action="`${apiUrl}/basics/upload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-progress="handleProgress"
            :before-upload="beforeAvatarUpload">
            <span v-if="addEditState"></span>
            <p v-else class="change-img">更换图片</p>
            <div slot="tip" class="el-upload__tip">建议上传414*138px图片，大小不超过1m</div>
            <el-progress v-if="0<percentage&&percentage<=100" type="circle" :percentage="percentage" :width="177" style="width:178px;height:178px;"></el-progress>
            <img v-if="ADForm.imge" :src="ADForm.imge" class="avatar">
            <i v-else-if="!ADForm.imge&&percentage>100||percentage<=0" class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
         </div>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <tinymce v-model="ADForm.content" :height="300" :width="700" />
        </el-form-item>
      </div>
      <!-- <el-form-item style="float:right;"> -->
      <el-form-item>

      </el-form-item>
    </el-form>
    <hint v-model="showReturn" title="返回" text="是否放弃该内容？" @confirm="handleBack" />
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import Tinymce from '@/components/Tinymce'
import hint from '@/components/Hint'
import Breadcrumb from '@/components/Breadcrumb'
import { addAdvertisement, editAdvertisement } from '@/api/advertisement.js'
export default {
  name: 'ADRelease',
  components: { Tinymce ,hint, Breadcrumb},
  // props: {
  //   editObject:{
  //     type: Object,
  //     default: function() {}
  //   }
  // },
  data() {
    return {
      addLoading:false,
      editLoading:false,
      percentage:0,
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
        content: [{ required: false, message: '请输入内容', trigger: 'blur' }]
      },
      apiUrl: '',
      addEditState: false,
      valid:false,
      showReturn:false
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
    handleProgress(event, file, fileList){
      this.percentage = event.percent
      this.ADForm.imge = ''
      // console.log(event, file, fileList, 'progress.....')
    },
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
        return false
      }
      // console.log(this.valWidthAndHeight(file), 'function1.......')
      // if(this.valWidthAndHeight(file)){
      //   console.log('true.......')
      // }
      // console.log(this.valWidthAndHeight(file), 'function2.......')
    },
    //验证图片宽高
    valWidthAndHeight(file){
      let _this =this
      let valid = false
      return new Promise(function(resolve, reject) {
        let _URL = window.URL || window.webkitURL;
        let image = new Image();
        image.src = _URL.createObjectURL(file);
        image.onload = function() {
          // console.log(image.height,image.width, 'img......')
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
      this.percentage = 101
    },
    submitForm(formName) {
      // console.log(formName, 'formName....')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addLoading = true
          // 发布广告接口
          addAdvertisement(this.ADForm).then(res => {
            this.$message.success('添加广告成功！')
            this.addLoading = false
            window.history.go(-1)
          }).catch(err => {
            console.log(err)
            this.addLoading = false
          })
        } else {
          return false

        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.showReturn = true
      // this.$router.back()
    },
    handleBack(){
      this.showReturn = false
      this.$router.back()
    },
    submitEditForm(formName) {

      // console.log(formName, 'formName....')
      this.$refs[formName].validate((valid) => {
        if (valid) {

          // 发布广告接口
          if(this.ADForm.status === '上架') {
            this.ADForm.status = 0
          } else {
            this.ADForm.status = 1
          }
          this.editLoading = true
          editAdvertisement(this.ADForm).then(res => {
            this.$message.success('编辑成功！')
            this.editLoading = false
            window.history.go(-1)
          }).catch(err => {
            console.log(err)
            this.editLoading = false
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
  .change-img{
    position:absolute;
    right:0px;
    line-height: 20px;
    font-size:14px;
    color:aliceblue;
    width:72px;
    height:20px;
    background-color: rgba(1,1,1,0.5);
    border-radius:5px;
  }
</style>
