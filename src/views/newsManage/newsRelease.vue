<template>
  <div class="body-margin" style="display:float;">
    <el-form ref="newsForm" :model="newsForm" :rules="rules" label-width="100px">
      <div style="float:left;">
        <el-form-item label="标题" prop="title">
          <el-input v-model="newsForm.title" style="width:400px;" />
        </el-form-item>
        <el-form-item label="对象" prop="object">
          <el-select v-model="newsForm.object" clearable multiple style="width:300px;">
            <el-option v-for="(item, index) in objectList" :key="index" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="类别" prop="newsType">
          <el-select v-model="newsForm.newsType" style="width:300px;">
            <el-option v-for="item in newsTypeList" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <tinymce v-model="newsForm.content" :height="300" :width="700" />
        </el-form-item>
      </div>
      <el-form-item style="float:right;">
        <el-button @click="resetForm('newsForm')">取消</el-button>
        <el-button @click="submitForm('newsForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  // name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      newsForm: {
        title: '',
        object: '',
        newsType: '',
        content: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        object: [{ required: true, message: '请输入对象', trigger: 'blur' }],
        newsType: [{ required: true, message: '请输入类别', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      content: '',
      newsTypeList: [
        {
          id: 1,
          name: '通讯'
        }
      ],
      objectList: [
        {
          id: 1,
          name: '高俅'
        },
        {
          id: 2,
          name: '林冲'
        }
      ]
    }
  },
  watch: {
    'content'(e) {
      console.log(e, 'eeeee')
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
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

<style scoped>

</style>

