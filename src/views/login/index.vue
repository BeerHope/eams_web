<template>
  <div class="login">
    <div class="webName">
      <svg-icon icon-class="logo"></svg-icon>
      <span>外协组包一体管理系统</span>
    </div>
    <div class="login-form-wrapper">
      <div class="loginForm">
        <h2>登录</h2>
        <el-form
          :model="loginForm"
          status-icon
          ref="loginForm"
          :rules="rules"
          label-width="60px"
          class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input type="text" placeholder="用户名" class="Input_box" v-model="loginForm.username"></el-input>
            <svg-icon class="btn-scan username" icon-class="username" />
          </el-form-item>
          <el-form-item prop="passwords">
            <el-input
              type="password"
              v-model="loginForm.passwords"
              class="Input_box"
              placeholder="密码"
            ></el-input>
            <svg-icon class="btn-scan password" icon-class="password" />
          </el-form-item>
          <div class="remember">
            <el-checkbox label="记住密码" name="ispass" v-model="remember"></el-checkbox>
          </div>
          <el-form-item>
            <el-button type="primary" class="submit" :loading="loading" @click="submitForm()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    
    <div class="bottomInfo">Copyright © 2020 深圳市新国都支付技术有限公司</div>
  </div>
</template>

<script>
import { doLogin, getUserInfo, getUserList } from "@/api/user";
import { getEncryptText } from "@/utils/encryption";
export default {
  name: "",
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      remember: false,
      loginForm: {
        username: "",
        passwords: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ],
        passwords: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loginForm.username = this.getCookie("username");
    this.loginForm.passwords = this.getCookie("passwords");
    if (this.loginForm.username && this.loginForm.passwords) {
      this.remember = true;
    }
    this.keyupSubmit();
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    keyupSubmit() {
      document.onkeydown = e => {
        let _key = window.event.keyCode;
        if (_key === 13) {
          this.submitForm();
        }
      };
    },
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.loginForm.password = getEncryptText(this.loginForm.passwords);
          doLogin(_.pick(this.loginForm, ["password", "username"]))
            .then(response => {
              // 登录成功获取用户信息并保存在vuex中（todo:后期修改）
              this.loading = true;
              if (this.remember) {
                //记住密码
                this.setCookie("username", this.loginForm.username);
                this.setCookie("passwords", this.loginForm.passwords);
              } else {
                this.setCookie("username", "");
                this.setCookie("passwords", "");
              }
              /* 设置token信息 */
              this.$store
                .dispatch("SaveLoginInfo", response.data.data)
                .then(() => {
                  this.$router.push({ path: "/" });
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              this.loading = false;
            });
        }
      });
    },
    // 获取cookie
    getCookie: function(key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + "=");
        if (start !== -1) {
          start = start + key.length + 1;
          var end = document.cookie.indexOf(";", start);
          if (end === -1) end = document.cookie.length;
          return unescape(document.cookie.substring(start, end));
        }
      }
      return "";
    },
    // 保存cookie
    setCookie: function(cName, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        cName +
        "=" +
        decodeURIComponent(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.login {
  background: url("~@/assets/images/login_bg1.jpg") 0px 0px no-repeat;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  background-size: 100% 100%;
}
.login .btn-scan {
  font-size: 18px;
  float: right;
  cursor: pointer;
  position: absolute;
  left: 6px;
  &.password{
    top: 10px;
  }
  &.username{
    top: 12px;
  }
}
.remember {
  margin-left: 260px;
  margin-bottom: 20px;
  position: relative;
  top: -16px;
}
.webName {
  position: absolute;
  color: $color_4350D8;
  font-family: Source Han Sans CN;
  font-size: 32px;
  padding-left: 3%;
  padding-top: 2%;
  .svg-icon{
    font-size: 38px;
    margin-right: 8px;
  }
}
.dologin {
  text-align: center;
}
.login .el-checkbox__input.is-checked + .el-checkbox__label {
  color: $color_6B77ED;
}
.login .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: $color_6B77ED;
  border-color: $color_6B77ED;
}
.el-button.submit{
  background-color: $color_6B77ED;
  border-color: $color_6B77ED;
}
.login .el-input__inner:focus {
  border-color: $color_6B77ED;
}
.login-form-wrapper{
  height: calc(100% - 40px);
  width: 46%;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginForm {
  width: 402px;
  height: 432px;
  background: white;
}
.loginForm h2 {
  text-align: center;
  font-size: 24px;
  font-weight: normal;
  padding: 20px 0;
  margin: 32px auto;
}
.Input_box {
  width: 280px;
}
.login .el-form-item {
  margin-bottom: 30px;
}
.Input_box input {
  padding-left: 40px !important;
}
.submit {
  width: 100%;
  background: $color_6B77ED;
  width: 280px;
}
.login input:-webkit-autofill,
.login input:-webkit-autofill:hover,
.login input:-webkit-autofill:focus,
.login input:-webkit-autofill:active {
  -webkit-transition-delay: 99999s;
  -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}
.bottomInfo {
  bottom: 0;
  text-align: center;
  position: absolute;
  color: $color_4350D8;
  font-size: 14px;
  line-height: 50px;
  width: 100%;
  background-color: rgba(255,255,255,.8);
}
</style>
