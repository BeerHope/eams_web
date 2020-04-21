<template>
  <div v-if="Step_1==true" class="content" >
    <h2>身份认证</h2>

    <el-form :model="findForm" :rules="rules"  ref="findForm"   class="findPass">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="findForm.username" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="code" class="labels" >

          <el-input v-model.number="findForm.code" style="width: 200px"  ></el-input>
          <el-button  v-waves type="success" :disabled="disabled=!show"  class="getCode" @click="send()">
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">{{count}} s</span>
          </el-button>



      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit_1" v-waves @click="nextStep()">下一步</el-button>

      </el-form-item>
    </el-form>



  </div>


</template>

<script>
  import waves from '@/directive/waves'; // 水波纹指令  checkUserAndSendCode
  import { checkUserAndSendCode ,checkRetrievePasswordCode } from '@/api/findPass'
  const TIME_COUNT = 60;
  export default {
        name: "step1",
      directives: { waves },
       data(){
         var checkPhone = (rule, value, callback) => {
           if (!value) {
             return callback(new Error('手机号不能为空'));
           } else {

             if(value.indexOf("@")>0){
               const reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
               if(!reg.test(value)){
                 callback(new Error('请输入有效的邮箱'));
               }else {
                 callback();
               }



             }else{
               const reg = /^1[3|4|5|7|8|6][0-9]\d{8}$/
               if (reg.test(value)) {
                 callback();
               } else {
                 return callback(new Error('请输入正确的手机号'));
               }

             }



           }
         }


          return{
            Step_1:true,
            findForm:{
              username:null,
              code:'',
              },
            show: true,  // 初始启用按钮
            count: '',   // 初始化次数
            timer: null,
            rules:{
              username: [
                {validator: checkPhone, trigger: 'blur'}
              ]

            }

          }

       },
      methods:{
        getCode(){



          checkUserAndSendCode({username:this.findForm.username }).then(response=>{
            console.log(response.data)
           if(response.data.data.userExist==true){

             if (!this.timer) {
               this.count = TIME_COUNT;
               this.show = false;
               this.timer = setInterval(() => {
                 if (this.count > 0 && this.count <= TIME_COUNT) {
                   this.count--;
                 } else {
                   this.show = true;
                   clearInterval(this.timer);  // 清除定时器
                   this.timer = null;
                 }
               }, 1000)
             }

           }else {

             this.$notify({
               title: "错误",
               message: "此账号没有注册，请先去注册!",
               type: "error",
               duration: 2000
             })


           }



          })



        },
        send(){
          this.$refs['findForm'].validate((valid) => {
            if (valid) {
              this.getCode();


            }else{


            }
          })

      },
        nextStep(){
          this.$refs['findForm'].validate((valid) => {
            if (valid) {
               if(this.findForm.code.length<=0){
                 this.$notify({
                   title: "错误",
                   message: "请输入验证码!",
                   type: "error",
                   duration: 2000
                 })
                 return false;
               }else{  //进行下一步判断

                 checkRetrievePasswordCode(this.findForm).then(response=>{
                     console.log(response.data);
                     if(response.data.data==true){
                       this.$parent.submit(2);
                     }else{
                       this.$notify({
                         title: "错误",
                         message: "验证码错误！",
                         type: "error",
                         duration: 2000
                       })

                     }





                 })






               }



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
