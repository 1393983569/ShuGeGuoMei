<template>
  <!-- <div class="body-margin" style="display:float;"> -->
  <div class="body-margin">
    <el-form ref="newsForm" :model="newsForm" :rules="rules" label-width="100px">
      <!-- <div style="float:left;"> -->
      <div>
        <el-form-item label="标题" prop="title">
          <el-input v-model="newsForm.title" style="width:400px;" />
        </el-form-item>
        <el-form-item label="缩略图:" prop="thumbnail">
          <div title="建议上传120*80px图片，大小不超过1m">
            <el-upload
              class="avatar-uploader"
              :action="`${apiUrl}/basics/upload`"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-progress="handleProgress"
              :before-upload="beforeAvatarUpload">
              <el-progress v-if="0<percentage&&percentage<=100" type="circle" :percentage="percentage" :width="177" style="width:178px;height:178px;"></el-progress>
              <img v-if="newsForm.thumbnail" :src="newsForm.thumbnail" class="avatar">
              <i v-else-if="!newsForm.thumbnail&&percentage>100||percentage<=0" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="对象" prop="shopIds">
          <el-select v-model="newsForm.shopIds" clearable multiple style="width:300px;">
            <el-option v-for="(item, index) in objectList" :key="index" :value="`${item.id}:${item.name}`" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="类别" prop="category">
          <el-select v-model="newsForm.category" style="width:300px;">
            <el-option v-for="item in newsTypeList" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <tinymce v-model="newsForm.content" :height="300" :width="700" />
        </el-form-item>
      </div>
      <!-- <el-form-item style="float:right;"> -->
      <el-form-item>
        <el-button type="warning" @click="resetForm('newsForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('newsForm')" :loading="loadingState">确定</el-button>
      </el-form-item>
    </el-form>
    <hint v-model="showReturn" title="返回" text="是否放弃该内容？" @confirm="handleBack" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { addNews } from '@/api/news.js'
import { getAllShop } from '@/api/shop.js'
import hint from '@/components/Hint'
export default {
  name: 'NewsRelease',
  // name: 'TinymceDemo',
  components: { Tinymce, hint },
  data() {
    const istitle=(rule, value, callback)=> {
      console.log(value, 'hhhhhhhhh')
    }
    return {
      newsForm: {
        title: '',
        shopIds: [],
        category: '',
        content: '',
        deleteStatus: 0,
        // shopJson: [],
        thumbnail:'',
      },
      apiUrl:'',
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur', validate:'istitle' }],
        shopIds: [{ required: true, message: '请输入对象', trigger: 'blur' }],
        category: [{ required: true, message: '请输入类别', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        thumbnail: [{ required: true, message: '请输入内容', trigger: 'blur' }],
      },
      content: '',
      newsTypeList: [
        {
          id: 0,
          name: '通知'
        },
        {
          id: 1,
          name: '资讯'
        }
      ],
      objectList: [],
      // shopArray: [],
      shopIdList: [],
      loadingState: false,
      percentage:0,
    }
  },
  watch: {
    'newsForm'(e) {
      console.log(e, 'eeeee')
    },
    'object.shopId'(e) {
      console.log(e, 'jjjjjjj')
      e.forEach(element => {
        console.log(element.split(':'), 'element....')
        const temp = {}
        temp.id = parseInt(element.split(':')[0])
        temp.name = element.split(':')[1]
        this.shopList.push(temp)
      })
    },
    'newsForm.title'(title){
      // 标题超出上限的验证
      if(title.length>40){
        this.$message.warning('该标题已超出字符上限，请重新输入！')
        this.newsForm.title = ''
      }

    }
  },
  mounted() {
    this.apiUrl = process.env.VUE_APP_BASE_API
    this.getAllShop()
  },
  methods: {
    addNewsHandle() {
      this.loadingState = true
        const addArray = {}
        addArray.title = this.newsForm.title
        addArray.category = this.newsForm.category + ''
        addArray.content = this.newsForm.content
        addArray.deleteStatus = this.newsForm.deleteStatus + ''
        // addArray.thumbnail = this.newsForm.thumbnail
        console.log(this.newsForm.shopIds, 'lhdhdufugfhngnguhih')
        let shopIdList = []
        let shopJson = []
        this.newsForm.shopIds.map(item => {
          let arr = item.split(':')
          shopIdList.push(arr[0])
          let ob = {}
          ob.id = arr[0]
          ob.name = arr[1]
          shopJson.push(ob)
        })
        // return
        addArray.shopJson = JSON.stringify(shopJson)
        addArray.shopIds = shopIdList.toString()
      addNews(addArray).then(res => {
        if (res.status === 1) {
          this.loadingState = false
          this.shopIds = []
          this.newsForm = {}
          this.$message.success('添加消息成功')
          this.$router.push({name:'news'})
        }
      }).catch(err => {
        this.loadingState = false
        console.log(err)
        this.$message.error('添加消息失败')
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addNewsHandle()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.showReturn = true
    },
    handleBack(){
      this.showReturn = false
      this.$router.back()
    },
    // 查询所有商铺
    getAllShop() {
      getAllShop().then(res => {
        console.log(res, 'kkkkkkk')
        if (res.info.length > 0) {
          this.objectList = res.info
        } else {
          this.$message.error('商铺暂无数据！')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err)
      })
    },
    beforeAvatarUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 1;
      if (!isLt20M) {
              this.$message.error('上传图片的大小不能超过 1M!');
      }
    },
    handleAvatarSuccess(res) {
      console.log(res, 'gggggg')
      this.percentage = 101
      this.newsForm.thumbnail = res.info
    },
    handleProgress(event, file, fileList){
      this.percentage = event.percent
      this.newsForm.thumbnail = ''
      console.log(event, file, fileList, 'progress.....')
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
    width:178px;
    height:178px;
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

