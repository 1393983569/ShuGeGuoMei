<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="login-input">
        <el-form-item prop="username">
          <md-input
            ref="username"
            v-model="loginForm.mobile"
            placeholder="Username"
            name="username"
            icon="用户"
            type="text"
            tabindex="1"
            auto-complete="on"
          >手机号</md-input>
        </el-form-item>
        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <md-input
              v-model="loginForm.password"
              icon="密码"
              :key="passwordType"
              ref="password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            >密码</md-input>
          </el-form-item>
        </el-tooltip>
        <p @click="change" class="forget-password">忘记密码</p>
        <el-button
          :loading="loading"
          type="primary"
          class="login-button"
          @click.native.prevent="handleLogin()"
        >登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
// import SocialSign from './components/SocialSignin'
import MdInput from "@/components/MDinput";
export default {
  name: "Login",
  components: {
    // SocialSign
    MdInput
  },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('请输入用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var isMobileNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value.length === 11) {
            callback();
          } else {
            callback(new Error("电话号码长度有误！"));
          }
        }
      }, 100);
    };
    return {
      loginForm: {
        mobile: "",
        password: "",
        type:1
      },
      loginRules: {
        mobile: [
          { required: true, trigger: "blur" },
          { validator: isMobileNumber, trigger: "blur" }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },

      passwordType: "password",
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === "") {
      // this.$refs.username.focus()
    } else if (this.loginForm.password === "") {
      // this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    change() {
      this.$router.push({ name: "forget" });
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= "a" && key <= "z")) ||
          (!shiftKey && (key >= "A" && key <= "Z"))
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      // 手机号验证
      if (this.isMobileNumber(this.loginForm.mobile)) {
        let _this = this;
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            console.log(_this.loginForm, 'vvvvv')
            _this.loading = true;
            _this.$store
              .dispatch("user/login", _this.loginForm)
              .then(() => {
                _this.$router.push({ name: "news", query: _this.otherQuery });
                _this.loading = false;
              })
              .catch(() => {
                _this.loading = false;
              });
          } else {
            return false;
          }
        });
      } else {
        return;
      }
    },
    isMobileNumber(value) {
      if (!value) {
        this.$message.warning("请输入手机号码！");
        return false;
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        const isPhone = reg.test(value);
        value = Number(value); //转换为数字
        if (typeof value === "number" && !isNaN(value)) {
          //判断是否为数字
          value = value.toString(); //转换成字符串
          if (value.length < 0 || value.length > 12 || !isPhone) {
            //判断是否为11位手机号
            this.$message.warning("手机号码格式有误！");
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
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
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
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
    border-bottom: 1px solid #deedc1;
    /*background: rgba(0, 0, 0, 0.1);*/
    border-radius: 5px;
    color: #454545;
    /*margin-bottom: 45px;*/
    display: block;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

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
  .login-input {
    /*position: absolute;*/
    width: 600px;
    height: 420px;
    // margin: 0 auto;
  }
  .login-button {
    width: 100%;
    margin-bottom: 30px;
    margin-top: 20px;
    background: #d0e6a5 100%;
    border: solid 1px #c5ceb4;
    box-shadow: 3px 3px 5px 0 #c5ceb4;
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
.forget-password {
  font-size: 14px;
  color: black;
  font-family: "微软雅黑";
  cursor: pointer;
  width: 99%;
  display: flex;
  justify-content: flex-end;
}
</style>
