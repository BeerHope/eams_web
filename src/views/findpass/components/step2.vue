<template>
  <div v-if="Step_2==true" class="content" >
    <h2>设置新密码</h2>

    <el-form :model="findForm"  ref="findForm" :rules="rules" class="findPass">
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="findForm.password" auto-complete="off"></el-input>
      </el-form-item>

        <el-form-item label="确认密码" prop="repassword" class="labels" >

        <el-input v-model="findForm.repassword"  type="password"></el-input>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-waves class="submit_1" @click="submitForm()">提交</el-button>

      </el-form-item>
    </el-form>



  </div>


</template>

<script>
  import waves from '@/directive/waves'; // 水波纹指令  checkUserAndSendCode

  export default {
    name: "step1",
    directives: { waves },
    data(){
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !==   this.findForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          console.log("#############")
          callback()
        }
      }

      return{
        Step_2:false,
        findForm:{
          password:null,
          repassword:null

        },
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9\W_]{6,12}$/, message: '密码长度为 6 - 12' }
          ],
          repassword: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ]
        }



      }

    },
    methods:{
      submitForm(){
        this.$refs['findForm'].validate((valid) => {
          if (valid) {
              this.$parent.submit(3);


          }})



      }



    }
  }
</script>

<style lang="scss">
  .findPass .el-form-item__label{ display: block; float: none;text-align: left; }
  .getCode{ width: 115px;}
  h2{ text-align: center; font-size: 28px; font-weight: normal; padding-top: 25px;}
  .submit_1{ width: 324px; margin-top: 15px;}
  .content{ width: 600px; margin: 0 auto; background: white;}
  .findPass{ width: 320px; margin: 0 auto; padding-bottom: 20px;}
</style>
