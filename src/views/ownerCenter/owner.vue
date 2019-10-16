<template>
  <div>
    <breadcrumb :stateShow="stateShow">
      <!-- <div><i classs="el-icon-back"></i><span>|</span>个人中心</div> -->
      <el-button size="mini" type="primary" @click="changePassword">修改密码</el-button>
      <el-button size="mini" type="danger" @click="logout">退出登录</el-button>
    </breadcrumb>
    <div style="display:flex;flex-direction:row;">
      <div style="margin:20px;">
        <el-upload
            class="avatar-uploader"
            :action="`${apiUrl}/basics/upload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-progress="handleProgress">
            <div class="avatar-change">更换头像</div>
            <el-progress v-if="0<percent&&percent<=100" type="circle" :percentage="percent" :width="177" style="width:178px;height:178px;"></el-progress>
            <img v-if="avatar" :src="avatar" class="avatar"/>
            <i v-else-if="!avatar&&percent>100||percent<=0" class="el-icon-plus avatar-uploader-icon"></i>
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
      <el-form style="margin-left:20px;" :model="ruleForm" label-position="right" label-width="100px" :rules="rules" ref="ruleForm" >
        <el-form-item label="姓名：">{{user.name}}</el-form-item>
        <el-form-item label="手机号：">{{user.mobile}}</el-form-item>
        <el-form-item label="验证码：" prop="msgCode">
          <div style="display:flex;flex-direction:row;">
            <el-input placeholder="请输入验证码" style="width:23%;margin-right:1px;" v-model="ruleForm.msgCode">
              <!-- <el-button slot="append" v-if="sendAuthCode" @click="getAuthCode">发送验证码</el-button> -->
              <!-- <el-button slot="append" v-else>{{auth_time}}秒后重发</el-button> -->
            </el-input>
            <div @click="refreshCode" style="border:none;">
              <Sidentify :identifyCode="identifyCode"></Sidentify>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="新密码：" prop="password">
          <el-input type="password" style="width:45%;" v-model="ruleForm.password" placeholder="请输入新密码"/>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPwd">
          <el-input type="password" style="width:45%;" v-model="ruleForm.confirmPwd" placeholder="请再次输入新密码"/>
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
import Sidentify from '@/components/Sidentify'
import {getCode, forgetPwd, editPwd} from '@/api/forgetPassword.js'
export default {
  name:'owner',
  components:{Breadcrumb,Sidentify},
  data(){
    return{
      percent:0,
      identifyCode:'',
      // identifyCodes:'1234567890',
      stateShow:false,
      showCodeState:false,
      apiUrl:'',
      avatar:'',
      user:{},
      dialogTableVisible:false,
      sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /*倒计时 计数器*/
      rules: {
        msgCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confirmPwd: [{ required: true, message: '请输入再次输入新密码', trigger: 'blur' }]
      },
      ruleForm: {
        password:'',
        confirmPwd:'',
        msgCode:'',
      }
    }
  },
  mounted(){
    this.stateShow=true
    console.log('this.$store：',this.$store)
    this.user = this.$store.state.user
    this.avatar = this.$store.state.user.avatar
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
    handleProgress(event, file, fileList){
      this.percent = event.percent
      this.avatar = ''
    },
    refreshCode(){
      getCode().then(res => {
        this.identifyCode = res.info.strCode
      }).catch(err=> {
        console.log(err)
      })
    },
    submitForm(formName) {
      if(this.ruleForm.password!== this.ruleForm.confirmPwd){
        this.$message.warning('密码不一致！')
        return
      }
      this.ruleForm.adminId = this.user.id
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editPwd(this.ruleForm).then(res => {
            if(res.status === 1){
              this.$message.success('修改成功！')
              this.dialogTableVisible = false
            }
          }).ctach(err=> {
            console.log(err)
            this.$message.error(err)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogTableVisible = false
    },
    // 上传文件成功后
    handleAvatarSuccess(file){
      this.percent = 101
      this.avatar = file.info
    },
    // 上传文件前
    beforeAvatarUpload(file){
      const isLt20M = file.size / 1024 / 1024 < 1;
      if (!isLt20M) {
        this.$message.error('上传图片的大小不能超过 1M!');
        return false
      }
    },
    // 修改密码弹框
    changePassword(){
      this.refreshCode()
      this.ruleForm.password = ''
      this.ruleForm.confirmPwd = ''
      this.ruleForm.msgCode = ''
      this.dialogTableVisible = true
      this.auth_time =0
      this.sendAuthCode = true;
      this.ruleForm
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
  .avatar-change{
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
