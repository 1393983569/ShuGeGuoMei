<template>
  <div>
    <breadcrumb>
      <el-button size="mini" type="primary" @click="changePassword">修改密码</el-button>
      <el-button size="mini" type="danger" @click="logout">退出登录</el-button>
    </breadcrumb>
    <div style="display:flex;flex-direction:row;">
      <div style="margin:20px;" title="更换头像">
        <el-upload
            class="avatar-uploader"
            :action="`${apiUrl}/basics/upload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="avatar" :src="avatar" class="avatar" alt="更换头像">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      </div>
      <div style="margin:10px;margin-top:50px;width:20%;">
        <el-form>
          <el-form-item label="用户名:">{{user.name}}</el-form-item>
          <el-form-item label="手机号:">{{user.mobile}}</el-form-item>
          <el-form-item label="角色:">{{user.rolename}}</el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogTableVisible">
      <!-- <p slot="title" class="header">修改密码</p> -->
      <el-form style="margin-left:20px;" :model="ruleForm" :rules="rules" ref="ruleForm" >
        <el-form-item label="姓名：">{{user.name}}</el-form-item>
        <el-form-item label="手机号：">{{user.mobile}}</el-form-item>
        <el-form-item label="验证码：" prop="code">
          <el-input placeholder="请输入验证码" style="width:45%;" v-model="ruleForm.code">
            <el-button slot="append" v-if="sendAuthCode" @click="getAuthCode">发送验证码</el-button>
            <el-button slot="append" v-else>{{auth_time}}秒发送信息</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newpassword">
          <el-input style="width:45%;" v-model="ruleForm.newpassword" placeholder="请输入新密码"/>
        </el-form-item>
        <el-form-item label="确认密码：" prop="oldpassword">
          <el-input style="width:45%;" v-model="ruleForm.oldpassword" placeholder="请再次输入新密码"/>
        </el-form-item>
        <el-form-item label="">
            <div style="display:flex;justify-content:flex-end;margin-right:10px;">
            <!-- <div> -->
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button type="danger" @click="resetForm('ruleForm')">取消</el-button>
            </div>
         </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name:'owner',
  components:{Breadcrumb},
  data(){
    return{
      showCodeState:false,
      apiUrl:'',
      avatar:'http://qiniu.freshergo.com/1569311477638.png',
      user:{},
      dialogTableVisible:false,
      sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /*倒计时 计数器*/
      rules: {
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        newpassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        oldpassword: [{ required: true, message: '请输入再次输入新密码', trigger: 'blur' }]
      },
      ruleForm: {
        code:'',
        newpassword:'',
        oldpassword:'',
      }
    }
  },
  mounted(){
    console.log('this.$store：',this.$store)
    this.user = this.$store.state.user
    this.apiUrl = process.env.VUE_APP_BASE_API
  },
  methods:{
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    getAuthCode() {
      this.sendAuthCode = false;
      this.auth_time = 40;
      var auth_timetimer =  setInterval(()=>{
          this.auth_time--;
          if(this.auth_time<=0){
              this.sendAuthCode = true;
              clearInterval(auth_timetimer);
          }
      }, 1000);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 上传文件成功后
    handleAvatarSuccess(file){
      this.avatar = file.info
    },
    // 上传文件前
    beforeAvatarUpload(){},
    // 修改密码弹框
    changePassword(){
      this.dialogTableVisible = true
    },
    // 发送验证码
    // getAuthCode(){},
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
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .header{
    border-bottom:1px solid rgba(187, 187, 187, 1);
    padding:10px;
    /* text-align:center; */
    margin:0px;width:100%;
  }
  .code{
    cursor: pointer;
  }
</style>
