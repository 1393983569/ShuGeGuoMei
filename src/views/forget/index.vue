<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <i class="el-icon-back return" @click="returnHandle"></i>
      <div class="login-input">
        <el-form-item prop="mobile">
          <md-input
            ref="username"
            v-model="loginForm.mobile"
            placeholder="请输入手机号"
            name="mobile"
            icon="用户"
            type="text"
            tabindex="1"
            auto-complete="on"
          >
          手机号
          </md-input>
        </el-form-item>
        <el-form-item prop="msgCode" style="border-bottom:none;">
          <div style="display:flex;flex-direction:row;border-bottom:none;align-items:center;">
            <md-input
              ref="验证码"
              v-model="loginForm.msgCode"
              placeholder="code"
              name="msgCode"
              icon="密码"
              type="number"
              tabindex="2"
              auto-complete="on"
              style="width:100%;border-bottom:1px solid #DEEDC1;"
            >验证码</md-input>
            <div style="position:absolute;top:3px;right:0px;text-align:center;cursor: pointer;">
              <div v-if="sendAuthCode" @click="getAuthCode" style="width: 110px;border-radius:5px;height:35px;background: #D0E6A5 100%;">发送验证码</div>
              <div v-else style="width: 110px;border-radius:5px;height:35px;background: #D0E6A5 100%;">{{auth_time}}秒后重发</div>
            </div>
            <!-- <div @click="refreshCode" style="border:none;margin:0px;padding:0px;">
              <Sidentify :identifyCode="identifyCode"></Sidentify>
            </div> -->

          </div>
        </el-form-item>
        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <md-input
              v-model="loginForm.password"
              icon="密码"
              :key="passwordType"
              ref="密码"
              :type="passwordType"
              placeholder="password"
              name="password"
              tabindex="3"
              auto-complete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            >
            新密码
            </md-input>
          </el-form-item>
        </el-tooltip>
        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="confirmPassword">
            <md-input
              v-model="loginForm.confirmPassword"
              icon="密码"
              :key="passwordType"
              ref="确认密码"
              :type="passwordType"
              placeholder="password"
              name="password"
              tabindex="4"
              auto-complete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            >确认密码
            </md-input>
          </el-form-item>
        </el-tooltip>
        <el-button :loading="loading" type="primary" class="login-button" @click.native.prevent="handleLogin">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'
import { validUsername } from '@/utils/validate'
import {getCode, forgetPwd, editPwd, checkCode, sendCode} from '@/api/forgetPassword.js'
import Sidentify from '@/components/Sidentify'
// import SocialSign from './components/SocialSignin'
import MdInput from '@/components/MDinput'
export default {
  name: 'forget',
  components: {
    // SocialSign
    MdInput,
    Sidentify
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      sendAuthCode:true,
      auth_time: 0,
      identifyCode:'',
      identifyCodes:'1234567890',
      loginForm: {
        mobile: '',
        password: '',
        confirmPassword:'',
        msgCode:''
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', message:'请输入手机号', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', message:'请输入密码', validator: validatePassword }],
        confirmPassword: [{ required: true,  message:'请输入密码',trigger: 'blur', }],
        msgCode: [{ required: true, message:'请输入验证码', trigger: 'blur',}]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {

    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.$set(this.loginForm, 'password', '')
    this.refreshCode()
    if (this.loginForm.username === '') {
      // this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      // this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    refreshCode(){
      getCode().then(res => {
        this.identifyCode = res.info.strCode
      }).catch(err=> {
        console.log(err)
      })
    },
    change(){
      this.$router.push({name:'forget'})
    },
    returnHandle(){
      this.$router.push({
        path:'/login'
      })
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          checkCode(this.loginForm.mobile, this.loginForm.msgCode).then(res => {
            if(res.status===1){
              this.forgetPwdHnadle()
            }
          }).catch(err=> {
            console.log(err)
            return
          })
          // this.$message.success('请登录！')
          // this.loading = true
          // this.$store.dispatch('user/login', this.loginForm)
          //   .then(() => {
          //     this.$router.push({ path: '/', query: this.otherQuery })
          //     this.loading = false
          //   })
          //   .catch(() => {
          //     this.loading = false
          //   })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    forgetPwdHnadle(){
      forgetPwd(this.loginForm).then(res => {
        if(res.status === 1){
          this.$router.push({
            path:'/login'
          })
        }
      }).catch(err=> {
        this.$message.error('操作失败！')
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    getAuthCode() {
      this.sendAuthCode = false;
      this.auth_time = 120;
      var auth_timetimer =  setInterval(()=>{
          this.auth_time--;
          if(this.auth_time<=0){
              this.sendAuthCode = true;
              clearInterval(auth_timetimer);
          }
      }, 1000);
      // 发送验证码
      if(this.loginForm.mobile){
        this.sendCodeHandle(this.loginForm.mobile)
      }
    },
    sendCodeHandle(phone){
      sendCode(phone).then().catch(err=> {
        console.log(err)
        this.$message.error('验证码发送失败！')
      })
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

// css3 判断
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border-bottom: 1px solid #DEEDC1;
    /*background: rgba(0, 0, 0, 0.1);*/
    border-radius: 5px;
    color: #454545;
    /*margin-bottom: 45px;*/
    display: block;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  /* background-color: $bg;*/
  background-image: url(../../assets/log-img/登录背景.png);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  overflow: hidden;

  .login-form {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    width: 941px;
    height: 697px;
    max-width: 100%;
    margin: 0 auto;
    background-image: url(../../assets/log-img/登录框.png);
  }
  .login-input{
    /*position: absolute;*/
    width: 600px;
    height: 420px;
    // margin: 0 auto;
  }
  .login-button {
    width:100%;
    margin-bottom:30px;
    margin-top: 20px;
    background: #D0E6A5 100%;
    border: solid 1px #C5CEB4;
    box-shadow: 3px 3px 5px 0 #C5CEB4;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.return{
  position: absolute;
  left:70px;
  top: 300px;
  // height: 400px;
  margin: auto;
  font-size:50px;
  font-weight:bold;
  color:#D0E6A5;
  cursor: pointer;
}
</style>
