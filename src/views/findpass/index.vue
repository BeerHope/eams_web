<template>
  <div class="app-container">
    <div class="main">
      <div class="steps-block">
        <el-steps :active="dataStep" align-center>
          <el-step title="身份认证" ></el-step>
          <el-step title="设置新密码" ></el-step>
          <el-step title="完成" ></el-step>
        </el-steps>
      </div>
      <step1 ref="step1"></step1>
      <step2 ref="step2"></step2>
      <step3 ref="step3"></step3>
    </div>
  </div>
</template>
<style >
  .el-step__icon{ height: 40px; width: 40px;}
  .el-step.is-horizontal .el-step__line{ top: 18px;}
  .app-container{ background: #F9F9F9; height: 100%;}
  .main{ width:817px;margin: 0 auto;  height: 500px; }
  .steps-block{ width: 600px; margin: 0 auto; margin-top: 150px; margin-top: 15%;}

</style>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import Step1 from './components/step1'
  import Step2 from './components/step2'
  import Step3 from './components/step3'
  import { retrievePassword } from '@/api/findPass'
  import JSEncrypt from 'jsencrypt/bin/jsencrypt'
    export default {
        name: "index",
      components: {  Step1,Step2,Step3 },
      directives: {
        waves
      },
      filters: {

      },
      data(){
          return{
            dataStep:0
          }
      },
      methods:{
        submit(step){
            switch (step) {
             //下一步判断
              case 2:  this.$refs['step1'].Step_1=false ;
                       this.$refs['step2'].Step_2=true ;
                       this.dataStep=1;
                       break;
              //提交判断
              case 3:
                let encryptor = new JSEncrypt() // 新建JSEncrypt对象
                let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5simUmTb1cbAaXLKUerWD+0BVsvLPW8FYryQnEFyqOFoA1P2SZXWkcv92eeodWvbonQGU9m3EL50o7W5s0EVvhDIo7kFKVlUmgCCL87SM67NFyy387db4EwR9TQkrBo3inxKp6TnFHlcbfeYuocfx1jqxUQsdn3lQ5C8K4qRIVQIDAQAB';  //把之前生成的贴进来，实际开发过程中，可以是后台传过来的
                encryptor.setPublicKey(publicKey) // 设置公钥
                let rsaPassWord = encryptor.encrypt(this.$refs['step2'].findForm.password)
                const senData={account:this.$refs['step1'].findForm.username,password:rsaPassWord,code:this.$refs['step1'].findForm.code};
                        retrievePassword(senData).then(response=>{
                            if(response.data.code==0){
                              this.dataStep=2;
                              this.$refs['step1'].Step_1=false ;
                              this.$refs['step2'].Step_2=false ;
                              this.$refs['step3'].Step_3=true ;
                              this.dataStep=4;
                            }else{
                              this.$notify({
                                title: "错误",
                                message: "密码修改失败，请联系管理员！",
                                type: "error",
                                duration: 2000
                              })
                            }
                        });
                        break;
            }
        }

      }
    }
</script>

<style scoped>

</style>
