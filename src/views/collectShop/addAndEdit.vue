<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="一级品类：" prop="name">
      <el-select v-model="value" clearable placeholder="请选择" style="width: 500px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级品类：" prop="name">
      <el-select v-model="value" clearable placeholder="请选择" style="width: 500px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品名称：" prop="name">
      <el-input v-model="input" placeholder="请输入内容" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="缩略图：" prop="name">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="展示图：" prop="name">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="标签：" prop="name">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
    </el-form-item>
    <el-form-item label="规格：" prop="name">
      <el-input v-model="input" placeholder="请输入内容" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="单位：" prop="name">
      <el-input v-model="input" placeholder="请输入内容" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="备注：" prop="name">
      <el-input v-model="input" placeholder="请输入内容" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="保质期：" prop="name">
      <el-date-picker
        v-model="value2"
        align="right"
        type="date"
        placeholder="选择日期"
        style="width: 500px"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="产地：" prop="name">
      <el-input v-model="input" placeholder="请输入内容" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="状态：" prop="name">
      <el-select v-model="value" clearable placeholder="请选择" style="width: 500px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="1进价：" prop="name">
      <el-input v-model="input" placeholder="请输入内容" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="2出价：" prop="name">
      <el-input v-model="input" placeholder="请输入内容" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="3零售价：" prop="name">
      <el-input v-model="input" placeholder="请输入内容" style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'addAndEdit',
    data () {
      return {
        options: [
          {
            label: 'sssss',
            value: '0'
          },
          {
            label: 'sssss',
            value: '4'
          },
          {
            label: 'sssss',
            value: '8'
          }
        ],
        ruleForm: {

        },
        rules: {
          name: [
            { required: true, message: '请输入', trigger: 'blur' },
          ]
        },
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      // 提交
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 重置
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        console.log('ssssssssssssss')
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>

<style scoped>
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
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
