<template>
  <div >
    <el-dialog title="新建账号" :visible.sync="dialogAdduser" class="dialog_content">
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="140px">

          <el-form-item label="客户:" prop="customerId">
            <el-select v-model="form.customerId" placeholder="请选择客户">

              <el-option v-for="item in customerList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="联系人姓名:" prop="contactName">
            <el-input v-model="form.contactName" class="input_1"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号码:" prop="contactPhone">
            <el-input v-model="form.contactPhone" @blur="form.username=form.contactPhone" class="input_1"></el-input>
          </el-form-item>
          <el-form-item label="登陆账号:" >
            <el-input v-model="form.username" :disabled="true" class="input_1"></el-input>
          </el-form-item>
          <div class="sub">
            <el-button @click="dialogAdduser=false">取消</el-button>
            <el-button type="primary" style="width: 80px" class="submit" @click="onSubmit">创建</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {GetUserAll,addUser} from '@/api/account'
  import { validatePhone } from '@/utils/validate'
  export default {
    name: "addUser",
    data(){
      const validatePhoneNum = (rule, value, callback) => {
        if (!validatePhone(value)) {
          callback(new Error('请输入正确的手机号码！'))
        } else {
          callback()
        }
      }

      return{
        customerList:[],
        form:{
          customerId:'',
          contactName:'',
          username:'',
          contactPhone:''
        },
        dialogAdduser:false,
        rules:{
          customerId: [
            { required: true, message: '请选择客户', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          contactPhone: [
            { required: true, message: '请输入联系人手机号', trigger: 'blur' },
            { validator: validatePhoneNum, trigger: 'blur' }
          ]
        }
      }
    },
    created(){
       this.GetUserAll();
    },
    methods:{
      GetUserAll(){
        GetUserAll().then(response=>{
           this.customerList=response.data.data;
        })
      },
      onSubmit(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
             addUser(this.form).then(response=>{
               if(!response){
                 return false;
               }
               this.dialogAdduser=false;
               this.$notify({
                 title: '成功',
                 message: '新增用户成功！',
                 type: 'success',
                 duration: 2000
               })
               this.$parent.fetchList();
             })
          }})
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
  .submit{ background: #1DC9BB; border-color: #1DC9BB; letter-spacing: 5px;}
  .input_1{ width: 60%;}
  .sub{ text-align: center}
  .sub .el-button{ margin-right: 30px;}
  .sub .submit{ background: #1DC9BB; border-color: #1DC9BB;}
  .upload_file{ background: #FCA84C; border-color: #FCA84C;}
  .download{     width: 80px;
    height: 25px;
    line-height: 25px;
    position: absolute;
    top: 8px;
    left: 105px;
    color: #5FA2FC;
    cursor: pointer;
    text-decoration: underline;}
  .upload-demo{ width: 400px;}
</style>
