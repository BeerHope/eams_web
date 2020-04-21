<template>
  <div >
    <el-dialog title="冻结" :visible.sync="dialogFreeze" class="dialog_content">
      <div>
        <el-form ref="form" :model="form" :rules="rules" class="content" label-width="60px">
          <div class="desc" v-if="cause.state==1">
            是否冻结 "{{cause.customerName}}" ，冻结后，该客户的部分业务操作将被限制？
          </div>

          <div class="desc" v-if="cause.state==2">
            是否激活 "{{cause.customerName}}" ，激活后，该客户可正常开展业务？
          </div>

          <el-form-item label="备注" prop="stateDesc" >
            <el-input type="textarea"   placeholder="请输入备注" v-model="form.stateDesc"></el-input>
          </el-form-item>



          <div class="sub">
            <el-button @click="dialogFreeze=false">取消</el-button>
            <el-button type="primary" class="submit" @click="onSubmit">{{cause.state==1?'冻结':'激活' }}  </el-button>

          </div>



        </el-form>

      </div>




    </el-dialog>


  </div>


</template>

<script>
  import {updateState} from '@/api/account'
  export default {
    name: "addUser",
    data(){
      return{

        form:{
          stateDesc:'',
          id:'',
          state:'',

        },
        dialogFreeze:false,
        rules:{
          stateDesc: [
            { required: true, message: '请输入冻结的原因', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    props:['cause'],
    created(){


    },
    methods:{
      onSubmit(){

        this.form.id=this.cause.id;
        this.form.state= this.cause.state==1?2:1;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            updateState(this.form).then(response=>{
              this.dialogFreeze=false;
              this.$notify({
                title: '成功',
                message: this.cause.state==1?'冻结成功！':'激活成功！',
                type: 'success',
                duration: 2000
              })
              this.$parent.fetchList();
            })
          }})
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePreview(file) {
        // console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>

<style scoped>
  .dialog_content{ width:75%; margin: 0 auto;}
  .dialog_content .content{ width: 70%;
    margin: 0 auto; line-height: 26px;}
  .submit{ background: #1DC9BB; border-color: #1DC9BB; width: 100px; letter-spacing: 5px;}
  .sub{ text-align: center}
  .sub .el-button{ margin-right: 60px;}
  .sub .submit{ background: #1DC9BB; border-color: #1DC9BB;}

</style>
