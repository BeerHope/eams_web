<template>
  <div class="login-container register">
    <h1>完善资料信息</h1>
    <el-form ref="form" class="reg-form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="手机号码" v-if="isphone===true" prop="phone">
        <el-input v-model="form.phone" :disabled="true" class="input_1"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" v-if="isemail===true" prop="email">
        <el-input v-model="form.email" :disabled="true" class="input_1"></el-input>
      </el-form-item>
      <el-form-item label="单位名称" prop="customerName">
        <el-input v-model="form.customerName" class="input_1"></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" class="input_1"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" class="input_1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 310px; line-height: 20px; font-size: 16px" @click="onSubmit">确定</el-button>
        <!--<el-button @click="Tologin">返回登陆</el-button>-->
      </el-form-item>
    </el-form>
    <div class="dologin">已有账号，前往<router-link style="color: #409EFF; font-size: 18px;" to="/">登录</router-link></div>
  </div>
</template>
<style>
  body{
    background: url('~@/assets/images/login_bg.jpg') 0px -100px no-repeat ;
    height: 100%;
    width: 100%;
    overflow-y: hidden;
  }
 .dologin{ text-align: center;}
</style>


<style lang="scss">
.register{ width: 700px; background: white; margin-top: 10% !important; height: 470px; padding-top:15px;}
  .login-container{  margin: 0 auto;
    h1{ line-height: 50px; height: 50px; text-align: center; font-weight: normal;}
    .reg-form{ width: 500px; margin: 0 auto;}
    }
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,.1);
    z-index: 2999;
  }
</style>

<script>

import {checkAddUser } from '@/api/sso'
import { redirectToLogin } from '@/api/login'


  export default {
    name: 'Branch',
    data() {
      return {
        form: {
          name: '',
          phone: '',
          email: '',
          address: '',
          token:null
        },
        isemail:false,
        isphone:false,
        rules:{
          name: [{required: true, message: '请输入用户名', trigger: 'change'}],
          address: [{required: true, message: '请输入地址', trigger: 'change'}],
          customerName:[{required: true, message: '请输入客户名称', trigger: 'change'}]
        }
      }
    },
    created(){
       this.form.token = this.$route.params && this.$route.params.token
       this.checkIssetAddUser(this.form.token)
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if(valid){
            addPersonalUser(this.form).then(response=>{
              const datas = response.data;
              this.$notify({
                title: '成功',
                message:datas.data.msg,
                type: 'success',
                duration: 2000
              })
              setTimeout(function () {
                redirectToLogin(process.env.CALL_BACK+`/login`)
              },1500)

            })

          }

        })

      },
      checkIssetAddUser(token){
        checkAddUser({
          token:token
        }).then(response => {
          const datas = response.data.data
          console.log(datas);

           if(datas.disable===true){   //已经注册，前去登录
             // this.$notify({
             //   title: '错误',
             //   message: '已经注册，前去登录！',
             //   type: 'error',
             //   duration: 2000
             // })
             // setTimeout(function () {
             //   redirectToLogin(process.env.CALL_BACK+`/login`)
             // },5000)

           }else if(datas.disable===null){  //请前去注册

             this.$notify({
               title: '错误',
               message: '前去注册！',
               type: 'error',
               duration: 2000
             })
            setTimeout(function () {
              redirectToLogin(process.env.CALL_BACK+`/login`)
            },3000)
           }else if(datas.disable===false){  //可以进行下一步操作
             if(datas.phone!=null){
                this.isphone=true
                this.isemail=false

                this.form.phone=datas.phone;
                this.form.email=datas.email;

             }else if(datas.email!=null){
               this.isemail=true
               this.isphone=false
               this.form.email=datas.email
             }
           }
        })



      },


      Tologin(){
        this.$router.push({
          path:"/login"
        })
      }
    }



  }
</script>
