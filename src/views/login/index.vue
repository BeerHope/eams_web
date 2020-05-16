<template>
  <div class="login">
    <div class="webName">外协组包一体管理系统</div>
    <div class="loginFrom">
        <h2> 用户登陆</h2>
      <el-form :model="loginFrom" status-icon  ref="loginFrom" :rules="rules"    label-width="60px" class="demo-ruleForm">
        <el-form-item  prop="username">
          <el-input type="text" placeholder="手机号码"  class="Input_box" v-model="loginFrom.username" ></el-input>
          <svg-icon class="btn-scan" icon-class="phone" />
        </el-form-item>
        <el-form-item  prop="passwords">
          <el-input type="password" v-model="loginFrom.passwords"  class="Input_box" placeholder="密码" ></el-input>
          <svg-icon class="btn-scan" icon-class="password" />
        </el-form-item>
        <div class="remember" >
          <el-checkbox label="记住密码" name="ispass" v-model="remember"></el-checkbox>
        </div>
        <el-form-item>
          <el-button type="primary" class="submit" :loading="loading" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottomInfo">
    <div class="version">Copyright © 2020 深圳市新国都支付技术有限公司 </div>
    </div>
  </div>
</template>

<script>
import {doLogin, getUserInfo, getUserList} from '@/api/user'
import {getEncryptText} from '@/utils/encryption'
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      remember: false,
      loginFrom:{
        username:'',
        passwords:'',
        password:'',
      },
      loading: false,
      rules:{
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
        ],
        passwords: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loginFrom.username=this.getCookie("username");
    this.loginFrom.passwords=this.getCookie("passwords");
    if (this.loginFrom.username && this.loginFrom.passwords) {
      this.remember = true
    }
    this.keyupSubmit();
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    keyupSubmit(){
      document.onkeydown=e=>{
        let _key=window.event.keyCode;
        if(_key===13){
          this.submitForm()
        }
      }
    },
    submitForm(){
      this.$refs.loginFrom.validate((valid) => {
        if (valid) {
          this.loading = true
          this.loginFrom.password = getEncryptText(this.loginFrom.passwords);
          doLogin(_.pick(this.loginFrom, ['password', 'username'])).then(response=>{
            // 登录成功获取用户信息并保存在vuex中（todo:后期修改）
            this.loading = true
            if(this.remember){ //记住密码
              this.setCookie("username",this.loginFrom.username);
              this.setCookie("passwords",this.loginFrom.passwords);
            }else {
              this.setCookie('username','');
              this.setCookie('passwords','');
            }
            /* 设置token信息 */
            this.$store.dispatch('SaveLoginInfo', response.data.data).then(() => {
              this.$router.push({ path: '/' });
            }).catch((err) => {
              console.log(err);
            })
          }).catch((err) => {
            this.loading = false
          })
        }})
    },
    // 获取cookie
    getCookie: function (key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },
    // 保存cookie
    setCookie: function (cName, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = cName + '=' + decodeURIComponent(value) +
        ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    },
  }
}
</script>

<style>
.login{
  background: url('~@/assets/images/login_bg.jpg') 0px -50px no-repeat ;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  background-size: 100%;
}
.login .btn-scan {
    font-size: 23px;
    float: right;
    margin-left: 5px;
    cursor: pointer;
    position: absolute;
    left: 1px;
    top: 7px;
  }
  .remember{
    height: 35px !important;
    margin-left: 260px;
    margin-top: 20px;
  }
  .webName{
    color: white;
    font-family: SourceHanSansCN-Regular;
    font-weight: Regular;
    font-size: 32px;
    line-height: 40px;
    padding-left: 3%;
    padding-top: 3%;
    letter-spacing: 2px;}
  .dologin{ text-align: center;}
 .login .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #1DC9BB;
  }
 .login .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #1DC9BB;
    border-color: #1DC9BB;
  }
  .login  .el-button--primary{
    background-color: #1DC9BB;
    border-color: #1DC9BB;
  }
  .login .el-input__inner:focus{
    border-color: #1DC9BB;
  }
  .el-button--primary:focus, .el-button--primary:hover{
    background-color: #1DC9BB;
    border-color: #1DC9BB;
  }
  .loginFrom{
    width: 402px;
    height: 358px;
    float: right;
    background: white;
    margin-right: 15%;
    margin-top: 10%;
  }
  .loginFrom h2{
    padding-left: 60px;
    font-size: 27px;
    font-weight: normal;
    padding-top: 20px;
    padding-bottom: 10px;
  }
  .Input_box{ width: 280px; }
  .login .el-form-item{ margin-bottom: 30px;}
  .Input_box input{ padding-left: 40px !important; }
  .submit{ width: 100%; background: #1DC9BB; width: 280px;}
 .login input:-webkit-autofill,
 .login input:-webkit-autofill:hover,
 .login input:-webkit-autofill:focus,
 .login input:-webkit-autofill:active {
    -webkit-transition-delay: 99999s;
    -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
  }
  .bottomInfo{ bottom: 25px; text-align: center; position: absolute; color: white; font-size: 14px; line-height: 30px; width: 100%; margin: 0 auto; margin-bottom: 5px; }
  .bottomInfo .version{ width: 400px; margin: 0 auto;}
</style>
