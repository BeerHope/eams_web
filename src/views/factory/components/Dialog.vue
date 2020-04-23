<template>
  <el-dialog
    custom-class="common-dialog"
    width="36%" :visible.sync="dialogVisible"
    title="新增工厂"
    @close="closeDialog">
    <el-form class="common-form" ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item prop="factoryName" label="工厂名称">
        <el-input v-model="formData.factoryName"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" class="green-btn" @click="addFactory">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { checkFactoryName, addFactory } from '@/api/factory'
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      formData: {
        foctoryName: '',
      },
      rules: {
        factoryName: [
          { required: true, message: '请输入工厂名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在2到30个字符', trigger: 'blur'}
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
    addFactory() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          addFactory(this.formData).then((res) => {
            this.dialogVisible = false
            this.$message.success('新增工厂成功!')
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
