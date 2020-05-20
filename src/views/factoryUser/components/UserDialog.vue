<template>
  <el-dialog
    custom-class="common-dialog"
    :title="dialogTitle" 
    width="36%" 
    @close="closeDialog"
    @open="openDialog"
    :visible.sync="dialogVisible">
    <el-form v-loading="loading" class="common-form" ref="form" :model="form" :rules="rules" label-width="140px">
      <el-form-item label="归属工厂:" prop="factoryId">
        <el-select :disabled="userId!==-1"  v-model="form.factoryId" placeholder="请选择工厂">
          <el-option v-for="item in factoryList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归属角色:" prop="roles">
        <el-select v-model="form.roles" :multiple-limit="5" multiple placeholder="请选择角色">
          <el-option
            v-for="item in factoryRoles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :disabled="userId!==-1" label="登录账号:" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item v-if="userId===-1" label="登录密码:" prop="password">
        <el-input v-model="form.password" :type="passwordVisible ? 'text': 'password'">
          <svg-icon 
            class="cur-pointer" slot="suffix" 
            :icon-class="passwordVisible ? 'eye-open' : 'eye-close'" 
            @click.stop.native="passwordVisible = !passwordVisible">
          </svg-icon>
        </el-input>
      </el-form-item>
      <el-form-item label="联系人姓名:" prop="contactName">
        <el-input v-model="form.contactName"></el-input>
      </el-form-item>
      <el-form-item label="联系手机号:" prop="contactPhone">
        <el-input v-model="form.contactPhone"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button v-if="userId===-1" type="primary" class="purple-btn" @click="addFactoryUser">新增</el-button>
      <el-button v-else type="primary" class="purple-btn" @click="updateFactoryUser">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getAllFactory } from '@/api/factory'
  import { addFactoryUser, updateFactoryUser, getUserDetails } from '@/api/user'
  import { getFactoryRoles } from '@/api/role'
  import { validatePhone, validatePassword } from '@/utils/validate'
  import { getEncryptText } from '@/utils/encryption'
  export default {
    name: "addUser",
    props: {
      factoryRoles: {
        type: Array,
        default: () => []
      }
    },
    data(){
      const checkPhone = (rule, value, callback) => {
        if (value && !validatePhone(value)) {
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
        loading: false,
        factoryList:[],
        passwordVisible: false,
        form:{
          factoryId:'',
          roles: [],
          contactName:'',
          contactPhone:'',
          password: '',
          username: '', // 当前账号,存在store中
        },
        dialogVisible:false,
        userId: -1,
        rules:{
          factoryId: [
            { required: true, message: '请选择归属工厂', trigger: 'blur' }
          ],
          roles: [
            { required: true, message: '请选择归属角色', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          contactPhone: [
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
    created(){
      this.getAllFactory();
    },
    computed: {
      ...mapGetters(['phone']),
      dialogTitle(){
        return this.userId === -1 ? '新增外协厂用户':'编辑外协厂用户'
      }
    },
    methods:{
      getAllFactory(){
        getAllFactory().then(response=>{
          this.factoryList= response && response.data ? response.data.data : [];
        })
      },
      getFactoryRoles() {
        getFactoryRoles().then(res => {
          this.factoryRoles = res.data && res.data.data
        })
      },
      addFactoryUser(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 处理提交输出
            const reqData = _.omit(this.form, ['password'])
            reqData.password = getEncryptText(this.form.password)
            addFactoryUser(reqData).then(res=>{
              this.dialogVisible=false;
              this.$message.success('新增外协厂用户成功');
              this.$emit('refresh');
            })
          }
        })
      },
      updateFactoryUser() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 编辑时只需要传如下几个参数
            const reqData = _.pick(this.form, ['id','contactName', 'contactPhone','roles'])
            updateFactoryUser(reqData).then(res=>{
              this.dialogVisible=false;
              this.$message.success('编辑外协厂用户成功');
              this.$emit('refresh')
            })
          }
        })
      },
      closeDialog() {
        this.$refs.form.resetFields()
        this.passwordVisible = false
      },
      openDialog() {
        /* 如果是编辑，则获取详情 */
        if(this.userId !== -1) {
          this.loading = true
          getUserDetails(this.userId).then(res => {
            this.form = res.data.data
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      },
    }
  }
</script>
<style scoped>
</style>
