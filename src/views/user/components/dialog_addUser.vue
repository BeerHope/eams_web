<template>
  <el-dialog
    custom-class="common-dialog"
    title="新增用户"
    width="36%"
    @close="closeDialog"
    :visible.sync="dialogVisible">
    <el-form class="common-form" ref="form" :model="form" :rules="rules" label-width="140px">
<!--      <el-form-item label="归属工厂:" prop="factoryId">-->
<!--        <el-select v-model="form.factoryId" placeholder="请选择客户">-->
<!--          <el-option v-for="item in factoryList"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->





      <el-form-item   label="登陆账号:" prop="username">
        <el-input  :readonly="action=='update'?true:false"  v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item v-if="action=='add'" label="登录密码:" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item label="角色" prop="roles">
        <el-select v-model="form.roles" multiple placeholder="请选择">
          <el-option
            v-for="item in rolelist"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人姓名:" prop="contactName">
        <el-input v-model="form.contactName"></el-input>
      </el-form-item>
      <el-form-item label="联系手机号:" prop="contactPhone">
        <el-input v-model="form.contactPhone"></el-input>
      </el-form-item>

      <!-- <el-form-item label="登陆账号:" >
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" class="green-btn" @click="onSubmit">{{action=='add'?'新增':'修改'}} </el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import { getAllFactory } from '@/api/factory'
  import { addSysUser ,updateSysUser} from '@/api/user'
  import { validatePhone, validatePassword } from '@/utils/validate'
  import { getEncryptText } from '@/utils/encryption'
  export default {
    name: "addUser",
    data(){
      const checkPhone = (rule, value, callback) => {
        if (!validatePhone(value)) {
          callback(new Error('请输入正确的手机号码！'))
        } else {
          callback()
        }
      }
      const checkPsd = (rule, value, callback) => {
        if (!validatePassword(value)) {
          callback(new Error('密码必须包含大小写字母，数字，长度在8~18个字符 '))
        } else {
          callback()
        }
      }
      return{
        // rolelist: [],
        'action':'add',  //add 新增 update 更新
        form:{

          contactName:'',
          contactPhone:'',
          password: '',
          roles:[],
          username: '', // 当前账号,存在store中
        },
        dialogVisible:false,
        rules:{
          // factoryId: [
          //   { required: true, message: '请选择客户', trigger: 'blur' }
          // ],
          roles:[
            { required: true, message: '请选择角色', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          contactPhone: [
            { required: true, message: '请输入联系人手机号', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入登录账号', trigger: 'blur' },
            {  min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { validator: checkPsd, trigger: 'blur' }
          ]
        }
      }
    },
    props:['rolelist'],
    created(){

    },
    computed: {
      ...mapGetters(['phone'])
    },
    methods:{

      onSubmit(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 处理提交输出
             if(this.action==='add'){
               const reqData = _.omit(this.form, ['password'])
               reqData.password = getEncryptText(this.form.password)
               addSysUser(reqData).then(res=>{
                 this.dialogVisible=false;
                 this.$message.success('新增用户成功');
                 this.$emit('refresh')
               })

             }else{ //修改
               updateSysUser(this.form).then(response=>{
                 this.dialogVisible=false;
                 this.$message.success('修改成功');
                 this.$emit('refresh')

               })

             }

          }
        })
      },
      closeDialog() {
        this.$refs.form.resetFields()
      },
      openDialog() {
        this.form.username = this.phone
      }
    }
  }
</script>
<style scoped>
</style>
