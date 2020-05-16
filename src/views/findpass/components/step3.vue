<template>
  <div v-if="Step_3==true" class="content" >
    <h2></h2>

    <el-form :model="findForm"  ref="ruleForm2"  class="findPass">
      <div style="text-align: center; line-height: 25px; font-size: 16px;">
        <svg-icon class="btn-face" icon-class="face" />
        <div class="success">登录密码重置成功！</div>



      </div>


      <el-form-item>
        <el-button type="primary" class="submit_1" @click="doLogin()">返回登录首页</el-button>

      </el-form-item>
    </el-form>



  </div>


</template>

<script>
  export default {
    name: "step3",
    data(){
      return{
        Step_3:false,
        findForm:{}



      }

    },
    methods:{
      doLogin(){
        this.$router.push({ path:"/"});
      }



    }
  }
</script>

<style lang="scss">
  .findPass .el-form-item__label{ display: block; float: none;text-align: left; }
  .findPass .success{ margin-top: 20px; line-height: 30px; text-align: center; margin-bottom: 20px;}
  .btn-face{ width: 46px; font-size: 46px; text-align: center;}
  .getCode{ width: 115px;}
  h2{ text-align: center; font-size: 28px; font-weight: normal; padding-top: 25px;}
  .submit_1{ width: 324px; margin-top: 15px;}
  .content{ width: 600px; margin: 0 auto; background: white;}
  .findPass{ width: 320px; margin: 0 auto; padding-bottom: 20px;}
</style>
