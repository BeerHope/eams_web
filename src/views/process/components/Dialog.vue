<template>
  <el-dialog
    width="36%"
    title="新增标识" 
    :visible.sync="dialogVisible"
    custom-class="common-dialog"
    @close="closeDialog">
    <el-form ref="form" :rules="rules" :model="formData" class="common-form" label-width="120px">
      <el-form-item label="KMS编码" prop="kmsCustomerCode">
        <el-input v-model="formData.kmsCustomerCode"></el-input>
      </el-form-item>
       <el-form-item label="标识" prop="processIdentity">
        <el-input v-model="formData.processIdentity"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" class="green-btn" @click="addProcess">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addProcess } from '@/api/process'

export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      formData: {
        kmsCustomerCode: '',
        processIdentity: ''
      },
      rules: {
        kmsCustomerCode: [
          { required: true, message: '请填写KMS编码', trigger: 'blur' }
        ],
        processIdentity: [
          { required: true, message: '请填写标识', trigger: 'blur' }
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
    closeDialog(){
      this.$refs.form.resetFields()
    },
    addProcess() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          addProcess(this.formData).then(res => {
            this.$emit('refresh')
            this.dialogVisible = false
            this.$message.success('新增标识成功')
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
