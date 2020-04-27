<template>
  <el-dialog 
    width="36%" :visible.sync="dialogVisible"
    custom-class="common-dialog" title="修改密码"
    @close="closeDialog">
    <el-form class="common-form" ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item prop="oldPassword" label="旧密码">
        <el-input v-model="formData.oldPassword" :type="passVisible1 ? 'text': 'password'">
          <svg-icon 
            class="cur-pointer" slot="suffix" 
            :icon-class="passVisible1 ? 'eye-open' : 'eye-close'" 
            @click.native="passVisible1 = !passVisible1">
          </svg-icon>
        </el-input>
      </el-form-item>
      <el-form-item prop="newPassword" label="新密码">
        <el-input v-model="formData.newPassword" :type="passVisible2 ? 'text': 'password'">
          <svg-icon 
            class="cur-pointer" slot="suffix" 
            :icon-class="passVisible2 ? 'eye-open' : 'eye-close'" 
            @click.native="passVisible2 = !passVisible2">
          </svg-icon>
        </el-input>
      </el-form-item>
      <el-form-item prop="reNewPassword" label="确认新密码">
        <el-input v-model="formData.reNewPassword" :type="passVisible3 ? 'text': 'password'">
          <svg-icon 
            class="cur-pointer" slot="suffix" 
            :icon-class="passVisible3 ? 'eye-open' : 'eye-close'" 
            @click.native="passVisible3 = !passVisible3">
          </svg-icon>
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" class="green-btn" @click="updatePassword">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updatePassword } from '@/api/user'
import { validatePassword } from '@/utils/validate'
import { getEncryptText } from '@/utils/encryption'
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    const checkPsd = (rule, value, callback) => {
      if (!validatePassword(value)) {
        callback(new Error('密码必须包含大小写字母，数字，长度在8~18个字符 '))
      } else {
        callback()
      }
    }
    const checkPsdConsistency = (rule, value, callback) => {
      if (this.formData.reNewPassword && !_.isEqual(this.formData.reNewPassword, this.formData.newPassword)) {
        callback(new Error('两次输入密码不一致, 请检查'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      passVisible1: false,
      passVisible2: false,
      passVisible3: false,
      formData: {
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入当前密码', trigger: 'blur' },
          { min: 8, message: '密码至少包含8个字符', trigger: 'blur'}
        ],
        newPassword: [
          { required: true, message: '请设置新密码', trigger: 'blur' },
          { validator: checkPsd, trigger: 'blur'},
        ],
        reNewPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: checkPsdConsistency, trigger: 'blur'}
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    closeDialog() {
      this.$refs.form.resetFields()
    },
    updatePassword() {
      this.$refs.form.validate((valid) => {
        if(valid) {
          const reqData = _.assign({
            oldPassword: getEncryptText(this.formData.oldPassword),
            newPassword: getEncryptText(this.formData.newPassword)
          })
          updatePassword(reqData).then(res => {
            this.$message.success('密码更新成功')
            this.dialogVisible = false
            // 退出登录
            setTimeout(() => {
              this.$store.dispatch('LogOut').then(() => {
                location.reload();
              })
            }, 300)
          })
        }
      })
    },
    // togglePassVisible
  }
}
</script>

<style lang='scss' scoped>

</style>
