<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="一级品类：" prop="name">
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
          }
        ],
        ruleForm: {

        },
        rules: {
          name: [
            { required: true, message: '请输入', trigger: 'blur' },
          ]
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
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
