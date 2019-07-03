<template>
  <!-- <div class="body-margin" style="display:float;"> -->
  <div class="body-margin">
    <el-form ref="newsForm" :model="newsForm" :rules="rules" label-width="100px">
      <!-- <div style="float:left;"> -->
      <div>
        <el-form-item label="标题" prop="title">
          <el-input v-model="newsForm.title" style="width:400px;" />
        </el-form-item>
        <el-form-item label="对象" prop="shopIdList">
          <el-select v-model="newsForm.shopArray" clearable multiple style="width:300px;">
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
        <el-button type="primary" @click="submitForm('newsForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { addNews } from '@/api/news.js'
import { getAllShop } from '@/api/shop.js'
export default {
  name: 'NewsRelease',
  // name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      newsForm: {
        title: '',
        shopArray: [],
        category: '',
        content: '',
        deleteStatus: 0
        // shopJson: [],
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        shopArray: [{ required: true, message: '请输入对象', trigger: 'blur' }],
        category: [{ required: true, message: '请输入类别', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
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
      shopIdList: []
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
    }
  },
  mounted() {
    this.getAllShop()
  },
  methods: {
    addNewsHandle() {
      console.log(this.newsForm.category, '$$$$$$$$$$$')
      this.addDArray = []
      const temp = []
      if (this.newsForm.shopArray) {
        this.newsForm.shopArray.map(e => {
          const obj = {}
          obj.id = e.split(':')[0]
          obj.name = e.split(':')[1]
          temp.push(obj)
        })
        this.addDArray = []
        this.addDArray.title = this.newsForm.title
        this.addDArray.category = this.newsForm.category + ''
        this.addDArray.content = this.newsForm.content
        this.addDArray.deleteStatus = this.newsForm.deleteStatus + ''
        this.addDArray.shopJson = JSON.stringify(temp)
      } else {
        this.$message.error('请选择对象')
        return
      }
      console.log(this.addDArray, 'ggggggg')
      // return
      addNews(this.addDArray).then(res => {
        if (res.status === 1) {
          this.shopArray = []
          this.newsForm = {}
          this.$message.success('添加消息成功')
        }
      }).catch(err => {
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
    }
  }
}
</script>

<style scoped>

</style>

