<template>
  <el-dialog width="36%" :title="cause.state==1? '冻结': '激活'" :visible.sync="dialogFreeze" custom-class="common-dialog" @close="closeDialog">
    <el-form ref="form" :model="form" :rules="rules" class="common-form" label-width="60px">
      <el-form-item>
        <span v-if="cause.state==1">是否冻结<strong>{{cause.contactPhone}}</strong> ，冻结后，该用户的部分业务操作将被限制？</span>
        <span v-if="cause.state==2">是否激活<strong>{{cause.contactPhone}}</strong> ，激活后，该客户可正常开展业务？</span>
      </el-form-item>
      <el-form-item label="备注" prop="stateDesc" >
        <el-input type="textarea"   placeholder="请输入备注" v-model="form.stateDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFreeze=false">取消</el-button>
        <el-button class="purple-btn" type="primary" @click="onSubmit">{{cause.state==1?'冻结':'激活' }}  </el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {updateState} from '@/api/user'
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
    props:{
      cause: {
        type: Object,
        default: null
      }
    },
    created(){},
    methods:{
      onSubmit(){
        this.form.id=this.cause.id;
        this.form.state= this.cause.state==1?2:1;
        this.$refs.form.validate((valid) => {
          if (valid) {
            updateState(this.form).then(response=>{
              this.dialogFreeze = false
              const successTips = this.cause.state==1?'冻结成功！':'激活成功！'
              this.$message.success(successTips)
              this.$emit('refresh')
            })
          }
        })
      },
      closeDialog() {
        this.$refs.form.resetFields()
      }
    }
  }
</script>

<style scoped>
</style>
