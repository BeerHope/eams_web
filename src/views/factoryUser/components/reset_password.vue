<template>
  <el-dialog title="重置密码" width="36%" :visible.sync="dialogVisible" @close="closeDialog">
    <el-form class="common-form" ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="newPassword" label="新密码">
        <el-input v-model="formData.newPassword" :type="passVisible ? 'text': 'password'">
          <svg-icon 
            class="cur-pointer" slot="suffix" 
            :icon-class="passVisible ? 'eye-open' : 'eye-close'" 
            @click.native="passVisible = !passVisible">
          </svg-icon>
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" class="green-btn" @click="resetPassword">重置</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { validatePassword } from '@/utils/validate'
import { getEncryptText } from '@/utils/encryption'
import { resetPassword } from '@/api/user'

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
    return {
      userId: '',
      dialogVisible: false,
      passVisible: false,
      formData: {
        newPassword: ''
      },
      rules: {
        newPassword: [
          { required: true, message: '请设置新密码', trigger: 'blur' },
          { validator: checkPsd, trigger: 'blur'},
        ],
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
    resetPassword() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const reqData = _.assign({
            id: this.userId,
            newPassword: getEncryptText(this.formData.newPassword)
          })
          resetPassword(reqData).then(res => {
            this.$message.success('重置密码成功')
            this.dialogVisible = false
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
